const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;
const axios = require('axios');

// List of HardCoded Users made to Test the GraphQl Server at the First Go. Now using a Json-Server instance in it's place
// const users = [
//     { id: '44', firstName: 'Apurba', age: 18 },
//     { id: '46', firstName: 'Anindita', age: 17 },
// ]

const CompanyType = new GraphQLObjectType({
    name: "Company",
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString }
    }
})

const UserType = new GraphQLObjectType({
	name: "User",
	fields: {
		id: { type: GraphQLString },
		firstName: { type: GraphQLString },
		age: { type: GraphQLInt },
        company: {
            type: CompanyType,
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                .then(response => response.data);
            }
        }
	},
});


const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		user: {
			type: UserType,
			args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/users/${args.id}`)
                .then(response => response.data);
            }
		},
	},
});

module.exports = new GraphQLSchema({
    query: RootQuery
})