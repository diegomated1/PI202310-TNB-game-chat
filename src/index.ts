import { Server } from "socket.io";

const io = new Server(3000, {
    cors: {
      origin: '*'
    }
});

io.on("connection", (socket) => {

    socket.on("disconnect", ()=>{
      console.log("disconnected");
    });
});
