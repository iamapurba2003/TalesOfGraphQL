const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const schema = require('./Schemas/schema.cjs');

const app = express();

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));
app.listen(4000, () => console.log('Listening on Port 4k'));