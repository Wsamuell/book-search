const express = require('express');
<<<<<<< HEAD
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require ('./utils/auth');

const db = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  context: authMiddleware 
});

server.applyMiddleware({ app });
=======
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;
>>>>>>> parent of 873c60c (graphQl server is up and running, going to test for queries now)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
// app.get('*', (req, res) => {
//  res.sendFile(path.join(__dirname, '../client/build/index.html'))
// });

<<<<<<< HEAD
=======
app.use(routes);
>>>>>>> parent of 873c60c (graphQl server is up and running, going to test for queries now)

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
