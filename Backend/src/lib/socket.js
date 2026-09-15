//import { disconnect } from "cluster";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

//Backend kisi aur port pr ho skta h toh browser ko allow karna padega ki frontend backend ke Socket.IO server se connect kar sake.
const allowedOrigin = process.env.FRONTEND_URL || "https://localhost:5173";

//Sirf allowed frontend origin ko Socket.IO connection ki permission do.
const io = new Server(server, {cors: { origin: [allowedOrigin]}});

function getReceiverSockedId(userId){
    return userSocketMap[userId];
}

//online user map = ( userid: socketid )
const userSocketMap = {};

//Users connects (signin).
io.on("connnection" ,(socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) userSocketMap[userId] = socket.id;

    //io.emit() sends event to every users - broadcast
    io.emit("getOnlineUsers" , Object.keys(userSocketMap));

    //users disconnects (signout).
    //socket.on is used to listen for events.
    socket.on("disconnect", ()=> {
        if(userId) delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app,server,io, getReceiverSockedId };