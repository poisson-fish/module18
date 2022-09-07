const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

main().catch(err => console.log(err))

async function main () {
  await mongoose.connect('mongodb://user:password@localhost:27017/testdb')
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
  })
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
