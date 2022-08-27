const express = require('express');
const routes = require('./routes');
const connection = require('./config/connection.js')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

//try connect to db
try {
  connection.authenticate()
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

connection.sync().then(() => {
  // sync sequelize models to the database, then turn on the server
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});

