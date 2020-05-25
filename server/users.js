const Users = require("./models/Users");

const addUser = async ({ id, name, room }) => {
  name = name.trim().toUpperCase();
  room = room.trim().toUpperCase();

  const existingUser = await Users.findOne({ room, name });

  if (!name || !room) return { error: 'Username and room are required.' };
  if (existingUser) return { error: 'Username is taken' };

  const user = await Users.create({
    _id: id,
    name,
    room
  });

  return { user };

};

const removeUser = async (id) => {
  const user = await Users.findOne({ _id: id });

  if (user) {
    return await user.remove().catch(err => console.log(err));
  }
}

const getUser = async (id) => await Users.findOne({ _id: id });

const getUsersInRoom = async (room) => await Users.find({ room });

module.exports = { addUser, removeUser, getUser, getUsersInRoom };