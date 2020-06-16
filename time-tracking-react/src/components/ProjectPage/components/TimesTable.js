import React from 'react';
import { Mutation } from "react-apollo";
import { projectTimes, removeTime } from '../../queries';


export default class TimesTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            descTime: "",
            amount: "",
            times: []
        }
    }

    render() {
        console.log('aaa', this.props.times)
        return (
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.times.map(time => (
                        <tr key={time.id}>
                            <td>{time.descTime}</td>
                            <td>{time.amount}</td>
                            <td className='text-center'>
                                <div className="btn-group border-0">
                                    <Mutation mutation={removeTime}>
                                        {(removeTime) => (
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() =>
                                                    removeTime({
                                                        variables: {
                                                            id: time.id
                                                        },
                                                        refetchQueries: [{
                                                            query: projectTimes,
                                                            variables: { id: this.props.selectedProject }
                                                        }]
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