import React, { Fragment } from 'react'
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { projectTimes, addTime } from '../queries';
import TimesTable from './components/TimesTable'

export class ProjectPage extends React.Component {
    constructor(props) {
        super(props);
        this.timeInputDescription = this.timeInputDescription.bind(this);
        this.timeInputAmount = this.timeInputAmount.bind(this);
        this.state = {
            selectedProject: null,
            timeAmount: 0,
            timeDescription: ''
        }
    }

    timeInputDescription(e) {
        this.setState({
            timeDescription: e.target.value
        })
    }

    timeInputAmount(e) {
        this.setState({
            timeAmount: parseInt(e.target.value)
        })
    }

    totalAddedHours(times) {
        console.log(times)
        let sum = 0;
        for (let i = 0; i < times.length; i++) {
            sum = sum + times[i].amount
        }
        return sum

    }

    render() {
        const selectedProject = this.props.match.params.id;

        return (
            <Fragment>
                <Link to={'/'} className="btn btn-primary">Back</Link>
                <Query query={projectTimes} variables={{ id: selectedProject }}>
                    {
                        ({ loading, data }) => (
                            <Fragment>
                                {
                                    loading ?
                                        <h4>Loading...</h4>

                                        :

                                        <Fragment>
                                            <div className="container">
                                                <h2>Project Summary</h2>
                                                <p>Name: {data.project.name}</p>
                                                <p>Description: {data.project.description}</p>
                                                <p>Total added hours: {this.totalAddedHours(data.project.times)} </p>
                                            </div>


                                            <div>
                                                <h2>All Times</h2>
                                                <TimesTable times={data.project.times} selectedProject={data.project.id} />
                                            </div>

                                            <div>
                                                <div className="row justify-content-center align-self-center">
                                                    <div className="col-sm-6">
                                                        <div className="form-container border border-primary rounded shadow p-3 mb-5 bg-white rounded">
                                                            <div className="form-group ">
                                                                <label htmlFor="pname">Description</label>
                                                                <input type="text" className="form-control" value={this.state.timeDescription} name="descTime" id="pname" placeholder="Add description" onChange={this.timeInputDescription} />
                                                            </div>
                                                            <div className="form-group ">
                                                                <label htmlFor="pname">Amount</label>
                                                                <input type="number" className="form-control" value={this.state.timeAmount} name="amount" id="pname" placeholder="Add amount" onChange={this.timeInputAmount} />
                                                            </div>
                                                            {/* <button className="btn btn-primary" onClick={this.HandleSubmit}>Add Time</button> */}
                                                            <Mutation mutation={addTime}>
                                                                {(addTime) => (
                                                                    <button className="btn btn-primary"
                                                                        onClick={() => {
                                                                            addTime({
                                                                                variables: {
                                                                                    descTime: this.state.timeDescription,
                                                                                    amount: this.state.timeAmount,
                                                                                    projectId: data.project.id
                                                                                },
                                                                                refetchQueries: [
                                                                                    {
                                                                                        query: projectTimes,
                                                                                        variables: {
                                                                                            id: selectedProject
                                                                                        }
                                                                                    }
                                                                                ]
                                                                            })
                                                                            this.setState({
                                                                                timeAmount: 0,
                                                                                timeDescription: ''
                                                                            })
                                                                        }}

                                                                    >Add Time</button>
                                                                )
                                                                }

                                                            </Mutation>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </Fragment>
                                }
                            </Fragment>
                        )
                    }
                </Query>

            </Fragment>
        )
    }
}