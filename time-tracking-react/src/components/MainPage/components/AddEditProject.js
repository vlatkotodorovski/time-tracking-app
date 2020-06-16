import React from 'react';
import { Query, Mutation } from "react-apollo";
import { addProjectMutation, getProjectByIdQuery, updateProjectById, getProjectsQuery } from '../../queries';

export default class AddEditProject extends React.Component {
    constructor(props) {
        super(props);
        this.handleFieldsChange = this.handleFieldsChange.bind(this);
        this.state = {
            name: '',
            description: ''
        }
    }

    handleFieldsChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        if (this.props.projectId) {
            return (
                <Query query={getProjectByIdQuery} variables={{ id: this.props.projectId }}>
                    {({ loading, error, data }) => (
                        <div className="row justify-content-center align-self-center">
                            <div className="col-sm-6">
                                <div className="form-container border border-primary rounded shadow p-3 mb-5 bg-white rounded">
                                    <div className="form-group ">
                                        <label htmlFor="name">Project Name</label>
                                        <input type="text" className="form-control" name="name" id="pname" placeholder="Enter project name" onChange={this.handleFieldsChange} />
                                    </div>
                                    <div className="form-group ">
                                        <label htmlFor="tarea">Project Descdription</label>
                                        <textarea className="form-control" name="description" id="tarea" onChange={this.handleFieldsChange} />
                                    </div>
                                    <Mutation mutation={updateProjectById}>
                                        {(updateProject) => (
                                            <button type="submit"
                                                className="btn btn-primary"
                                                onClick={() => {
                                                    updateProject({
                                                        variables: {
                                                            id: this.props.projectId,
                                                            name: this.state.name,
                                                            description: this.state.description
                                                        },
                                                        refetchQueries:[{query:getProjectsQuery}]
                                                    })
                                                    this.props.onUpdateEnd();
                                                }}>
                                                Update Project
                                                </button>
                                        )}
                                    </Mutation>
                                </div>
                            </div>

                        </div>
                    )}
                </Query>
            )
        } else {
            return (
                <Mutation mutation={addProjectMutation}>
                    {(addProject) => (
                        <div className="row justify-content-center align-self-center">
                            <div className="col-sm-6">
                                <div className="form-container border border-primary rounded shadow p-3 mb-5 bg-white rounded">
                                    <div className="form-group ">
                                        <label htmlFor="name">Project Name</label>
                                        <input type="text" className="form-control" name="name" id="pname" placeholder="Enter project name" onChange={this.handleFieldsChange} />
                                    </div>
                                    <div className="form-group ">
                                        <label htmlFor="tarea">Project Descdription</label>
                                        <textarea className="form-control" name="description" id="tarea" onChange={this.handleFieldsChange} />
                                    </div>
                                    <button type="submit"
                                        className="btn btn-primary"
                                        onClick={() => {
                                            addProject({
                                                variables: {
                                                    name: this.state.name,
                                                    description: this.state.description
                                                },
                                                refetchQueries:[{query:getProjectsQuery}]
                                            })
                                        }}>
                                        Add Project
                                </button>
                                </div>
                            </div>

                        </div>
                    )}
                </Mutation>
            )
        }
    }
}