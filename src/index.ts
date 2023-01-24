import app from './app'; 
import express from "express";
import path from "path";
import logger from "morgan";
import http from "http";
import cors from "cors";
import './database'; 

var server = app.listen(3000);
var io = require("socket.io").listen(server);
console.log("Servidor arrancado")

app.use(express.json());
var clients = {};
const connectedUsers = new Map();

io.on("connection", (socket:any) => {
    console.log("connected");
    console.log(socket.id, "ha entrado ");
    socket.on("singin", (id:any) => {
        console.log(id);
        clients[id] = socket;
        console.log(clients);
    });
    socket.on("login", (roomId: any, usr: any) => {
        console.log("Buenas "+usr+"!! Bienvenido a la sala de chat de "+roomId);
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
        io.to(roomId).emit("sendMessage", usr+" se ha conectado al chat de "+roomId+".");
        console.log("Ahora la lista de conectados queda asi: "+connectedUsers.get(roomId));
        io.to(roomId).emit("updateUsers", connectedUsers.get(roomId));
    });
    socket.on("sendMessage", (message: string, roomId: string, usr: any) => {
        console.log(usr+" ha dicho: "+ message + " en la sala de: " +roomId);
        io.to(roomId).emit("sendMessage", message, usr);

    });
    socket.on("disconnected", (roomId: any, usr: any) => {
        console.log(usr+" se ha desconectado del chat.");
        io.to(roomId).emit("sendMessage", usr+" se ha desconectado del chat.");
        //Borro al usuario
        let userList = connectedUsers.get(roomId);
        userList = userList.filter(u=> u !== usr);
        if (!userList.length) {
            connectedUsers.delete(roomId);
        } else 
        {
            connectedUsers.set(roomId, userList);
        }
        console.log ("La lista de conectados queda asi : "+userList);
        io.to(roomId).emit("updateUsers", connectedUsers.get(roomId));
    });
});