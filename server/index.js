const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const mongoose = require("mongoose");
const Users = require("./models/Users.js");

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connect', async (socket) => {
  socket.on('join', async ({ name, room }, callback) => {
    const { error, user } = await addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    const users = await getUsersInRoom(user.room);

    socket.join(user.room);
    socket.emit('message', { user: 'Admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has joined!` });
    io.to(user.room).emit('roomData', { room: user.room, users });
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', async () => {
    const user = await removeUser(socket.id);

    if(user) {
      const users = await getUsersInRoom(user.room);

      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users });
    };
  });
});

server.listen(process.env.PORT || 8080, () => console.log(`Server has started.`));

mongoose.connect("mongodb+srv://Jesus:Jesus@cluster0-lfjpj.mongodb.net/test?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connection
.on("connected", () => console.log("Connected to MongoDB"))
.on("error", (err) => console.log(err))
.on("disconnected", () => console.log("Disconnected from MongoDB"));

Users.deleteMany().catch(err => console.log(err)).then(() => console.log("Clearing up database..."));