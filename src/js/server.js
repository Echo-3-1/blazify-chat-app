const io = require('socket.io')(3000)
const mongoose = require("mongoose")

const users = {}

io.on('connection', socket => {

  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })

  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})

mongoose.connect("mongodb+srv://Jesus:Jesus@cluster0-lfjpj.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection
.on("connected", () => console.log("Connected to MongoDB"))
.on("err", err => console.log(`A MongoDB connection error has occured: ${err.stack}`))
.on("disconnected", () => console.log(`Disconnected from MongoDB`));