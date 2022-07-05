const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const messagesRoute = require('./routes/messagesRoutes')
const socket = require('socket.io')

const app = express()
require('dotenv').config()

app.use(cors())
app.use(express.json())

app.use('/api/auth', userRoutes)
app.use('/api/messages', messagesRoute)

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

const server = app.listen(PORT, () => {
    console.log('Server is running on port 3000')
})

//socket connection
const io = socket(server, {
    cors: {
        origin: 'http://localhost:3030', //if you have a custom origin you can add it here
        credentials: true,
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
    },
    allowEIO3: true

})

global.onlineUsers = new Map() //All Online users will be stored in this map

io.on('connection', (socket) => {
    global.chatSocket = socket //store the socket in the global socket
    socket.on('add-user', (userID) => {
        onlineUsers.set(userID, socket.id) //When a user is logged in it will establish a socket connection
    })

    socket.on('send-message', (data) => {
        const sendUserSocket = onlineUsers.get(data.to)
        if (sendUserSocket) { //if user is online
            socket.to(sendUserSocket).emit('msg-recieved', data.msg) //the sent message will be emitted to the online user. If said user is offline it'll be stored in the database.
        }
    })
})