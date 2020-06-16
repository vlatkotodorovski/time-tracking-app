const graphql = require('graphql')
const _ = require('lodash')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

//dummy data


let projects = [
    { name: 'test project 1', description: 'test desc 1', id: 1 },
    { name: 'test project 2', description: 'test desc 2', id: 2 },
    { name: 'test project 3', description: 'test desc 3', id: 3 }
]

let times = [
    { descTime: 'test descTime 1', amount: 2, id: 1, projectId: 1 },
    { descTime: 'test descTime 2', amount: 4, id: 2, projectId: 2 },
    { descTime: 'test descTime 3', amount: 7, id: 3, projectId: 3 },
    { descTime: 'test descTime 4', amount: 9, id: 4, projectId: 2 },
    { descTime: 'test descTime 5', amount: 3, id: 5, projectId: 3 },
    { descTime: 'test descTime 6', amount: 8, id: 6, projectId: 3 }
]

// var projects = {}

// var times = {}

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        times: {
            type: new GraphQLList(TimeType),
            resolve(parent, args) {
                return _.filter(times, { projectId: parent.id })
            }
        }
    })
});

const TimeType = new GraphQLObjectType({
    name: 'Time',
    fields: () => ({
        id: { type: GraphQLID },
        descTime: { type: GraphQLString },
        amount: { type: GraphQLInt },
        project: {
            type: ProjectType,
            resolve(parent, args) {
                console.log(parent)
                return _.find(projects, { id: parent.projectId })
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
               
                return _.find(projects, { id: Number(args.id) });
            }
        },
        time: {
            type: TimeType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(times, { id: Number(args.id) })
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return projects
            }
        },
        times: {
            type: new GraphQLList(TimeType),
            resolve(parent, args) {
                return times
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLID },
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                console.log(args)
                let project = ({
                    id: Math.floor(Math.random() * 100000) + 1,
                    name: args.name,
                    description: args.description
                })
                return projects.push(project)
            }
            
        },
        removeProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                projects = projects.filter(project => String(project.id) !== String(args.id))
                return projects;
            }
        },
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLID },
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                projects = projects.map(project => {
                    if (String(project.id) === String(args.id)) {
                        project.name = args.name;
                        project.description = args.description
                    }
                    return project;
                })
                return projects;
            }
        },
        removeTime: {
            type: TimeType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                times = times.filter(time => String(time.id) !== String(args.id))
                return times;
            }
        },
        addTime: {
            type: TimeType,
            args: {
                projectId: {type: GraphQLID},
                descTime: {type: new GraphQLNonNull(GraphQLString)},
                amount: {type: new GraphQLNonNull(GraphQLInt)}            
            },
            resolve(parent, args){
                let time = ({
                    id: Math.floor(Math.random() * 100000) + 1,
                    descTime: args.descTime,
                    amount: args.amount,
                    projectId: Number(args.projectId)
                })
                return times.push(time)
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});