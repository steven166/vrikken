const RoomService = require("./services/room.service").RoomService;
const UserService = require("./services/user.service").UserService;
const UserRepository = require("./repositories/user.repository").UserRepository;
const RoomRepository = require("./repositories/room.repository").RoomRepository;

module.exports.userRepository = new UserRepository();
module.exports.roomRepository = new RoomRepository();
module.exports.userService = new UserService(module.exports.userRepository);
module.exports.roomService = new RoomService(module.exports.roomRepository, module.exports.userService);
