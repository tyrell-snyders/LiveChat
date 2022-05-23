const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
require('dotenv').config()

app.use(cors) //To avoid problems with CORS in the future on browsers
app.use(express.json())

//mongoose connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to database') //TO verify that it is connected to the db
}).catch((err) => {
    console.log(err.message) //Throws an error if it is not connected to the db
})

//Run the server on the specified port
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})