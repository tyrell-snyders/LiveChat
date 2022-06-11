const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')

const app = express()
require('dotenv').config()

app.use(cors())
app.use(express.json())

app.use('/api/auth', userRoutes)

//mongoose connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to database') //TO verify that it is connected to the db
}).catch((err) => {
    console.log(err.message) //Throws an error if it is not connected to the db
})


app.get('/', (req, res) => {
    res.send('Hello World!')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Server is running on port 3000')
})