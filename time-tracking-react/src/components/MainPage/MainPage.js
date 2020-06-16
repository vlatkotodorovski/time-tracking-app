import React, { Fragment } from 'react'
import AddEditProject from './components/AddEditProject'
import ProjectsTable from './components/ProjectsTable'

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.setProjectForEdit = this.setProjectForEdit.bind(this);
        this.removeProjectForEdit = this.removeProjectForEdit.bind(this);
        this.state = {
            editingProject: null
        }
    }

    setProjectForEdit(projectId) {
        this.setState({ editingProject: projectId })
    }

    removeProjectForEdit() {
        this.setState({ editingProject: null })
    }

    render() {
        return (
            <Fragment>
                <h2>All Projects</h2>
                <AddEditProject projectId={this.state.editingProject} onUpdateEnd={this.removeProjectForEdit} />
                <ProjectsTable onProjectEdit={this.setProjectForEdit} />
            </Fragment>
        )

    }
}

