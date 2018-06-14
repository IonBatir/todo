// server/app.js
/** require dependencies */
const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const graphqlHTTP = require("express-graphql");

const app = express()
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/todos"

/** connect to MongoDB datastore */
try {
    mongoose.connect(url, {
        //useMongoClient: true
    })
    console.log('Connection established to', url); 
} catch (error) {
    console.log('Unable to connect to the mongoDB server. Error:', error);
}

let port = 5000 || process.env.PORT

/** set up middlewares */
app.use('*', cors())
app.use(bodyParser.json())
app.use(helmet())

const todoSchema = require('./graphql/index').todoSchema
app.use('/graphql', cors(), graphqlHTTP({
  schema: todoSchema,
  rootValue: global,
  graphiql: true
}));

/** start server */
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});