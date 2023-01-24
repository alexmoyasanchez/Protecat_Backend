"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const express_1 = __importDefault(require("express"));
require("./database");
var server = app_1.default.listen(3000);
var io = require("socket.io").listen(server);
console.log("Servidor arrancado");
app_1.default.use(express_1.default.json());
var clients = {};
const connectedUsers = new Map();
io.on("connection", (socket) => {
    console.log("connected");
    console.log(socket.id, "ha entrado ");
    socket.on("singin", (id) => {
        console.log(id);
        clients[id] = socket;
        console.log(clients);
    });
    socket.on("login", (roomId, usr) => {
        console.log("Buenas " + usr + "!! Bienvenido a la sala de chat de " + roomId);
        socket.join(roomId);
        //Si no existe una entrada para esta comunidad
        if (!connectedUsers.has(roomId)) {
            connectedUsers.set(roomId, []);
            connectedUsers.get(roomId).push(".");
        }
        //Añado al nuevo conectado al registro de conectados
        if (!connectedUsers.has(usr)) {
            connectedUsers.get(roomId).push(usr);
        }
        // console.log("Se ha añadoido el ultimo conectado, la lista queda asi: "+connectedUsers.get(roomId));
        io.to(roomId).emit("sendMessage", usr + " se ha conectado al chat de " + roomId + ".");
        console.log("Ahora la lista de conectados queda asi: " + connectedUsers.get(roomId));
        io.to(roomId).emit("updateUsers", connectedUsers.get(roomId));
    });
    socket.on("sendMessage", (message, roomId, usr) => {
        console.log(usr + " ha dicho: " + message + " en la sala de: " + roomId);
        io.to(roomId).emit("sendMessage", message, usr);
    });
    socket.on("disconnected", (roomId, usr) => {
        console.log(usr + " se ha desconectado del chat.");
        io.to(roomId).emit("sendMessage", usr + " se ha desconectado del chat.");
        //Borro al usuario
        let userList = connectedUsers.get(roomId);
        userList = userList.filter(u => u !== usr);
        if (!userList.length) {
            connectedUsers.delete(roomId);
        }
        else {
            connectedUsers.set(roomId, userList);
        }
        console.log("La lista de conectados queda asi : " + userList);
        io.to(roomId).emit("updateUsers", connectedUsers.get(roomId));
    });
});
