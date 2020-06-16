import React from 'react'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import MainPage from '../MainPage/MainPage'
import '../../styles/global.css'
import { Route, BrowserRouter } from 'react-router-dom'
import { ProjectPage } from '../ProjectPage/ProjectPage';



// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
})

export class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <main className='container'>
                        {/* <MainPage /> */}
                        <Route exact path="/" component={MainPage} />
                        <Route path="/project/:id" component={ProjectPage} />
                    </main>
                </BrowserRouter>
            </ApolloProvider>
        )
    }
}

export default App