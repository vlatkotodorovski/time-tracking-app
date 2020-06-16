import React from 'react';
import { Link } from 'react-router-dom';
import { Query, Mutation } from "react-apollo";
import { getProjectsQuery, removeProjectMutation } from '../../queries';


export default class AddProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        }
    }

    render() {
        return (
            <Query
                query={getProjectsQuery}
            // pollInterval={500}
            >
                {
                    ({ loading, error, data }) => {
                        if (loading) return <h4>Loading...</h4>
                        if (error) console.log(error)

                        return (
                            <table className="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th>Project Name</th>
                                        <th>Description</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.projects.map(project => (
                                        <tr key={project.id}>
                                            <td>{project.name}</td>
                                            <td>{project.description}</td>
                                            <td className='text-center'>
                                                <div className="btn-group border-0">
                                                    
                                                    <Link to={`/project/${project.id}`} className="btn btn-primary" > VIEW </Link>


                                                    <button type="button" className="btn btn-success" onClick={() => {
                                                        this.props.onProjectEdit(project.id);
                                                    }}>EDIT</button>
                                                    <Mutation mutation={removeProjectMutation}>
                                                        {(removeProject) => (
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger"
                                                                onClick={() =>
                                                                    removeProject({
                                                                        variables: {
                                                                            id: project.id
                                                                        },
                                                                        refetchQueries: [{ query: getProjectsQuery }]
                                                                    })}
                                                            >Remove</button>
                                                        )}
                                                    </Mutation>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )
                    }
                }
            </Query>
        )
    }
}