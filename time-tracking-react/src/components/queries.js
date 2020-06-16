import gql from "graphql-tag";

export const addProjectMutation = gql`
    mutation($name:String!,$description:String!){
    addProject(name: $name, description: $description){
        name
        description
                    
    } 
    }
`;

export const getProjectsQuery = gql`
    query{
        projects {
            id
            name
            description
        }
    }
`;

export const getProjectByIdQuery = gql`
    query Project($id: ID!) {
        project(id: $id) {
            id
            name
            description
        }
    }
`;

export const removeProjectMutation = gql`
    mutation($id:ID!){
       removeProject(id: $id){
           id
       } 
    }
`;

export const updateProjectById = gql`
    mutation($id:ID!, $name:String!,$description:String!){
      updateProject( id:$id, name: $name, description: $description){  
          id
           name
           description
       } 
    }
`;

export const projectTimes = gql`
query($id: ID!) {
    project(id: $id) {
        id
        name
        description
        times{
            descTime
            amount
            id
        }
    }
}
`

export const removeTime = gql`
mutation($id:ID!){
    removeTime(id: $id){
        id
    } 
 }
`

export const addTime = gql`
mutation($descTime: String!, $amount: Int!, $projectId:ID!){
    addTime(projectId: $projectId, descTime: $descTime, amount: $amount){
        descTime
        amount
    }
}
`