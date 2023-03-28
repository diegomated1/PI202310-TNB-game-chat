// Importar el módulo de Socket.IO
import { Server } from "socket.io";
import http from 'http';
import chatController from "./controllers/message.controller.js";

// Crear una instancia de Socket.IO
const server = http.createServer();
server.listen(3005, '192.168.1.22');

const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

// Escuchar eventos de conexión en el servidor
io.on("connection", (socket) => {
  chatController(io, socket);

  // Escuchar el evento de desconexión
  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});
