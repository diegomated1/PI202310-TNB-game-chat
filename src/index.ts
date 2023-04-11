import dotenv from 'dotenv';
import express, { Application } from 'express';
import http from 'http';
import io from 'socket.io';
import ChatListeners from "./listeners/chat.listeners.js";
import cors from 'cors';

class App{

  app: Application
  server: http.Server
  io: io.Server

  constructor(){
      this.app = express();
      this.server = new http.Server(this.app);
      this.io = new io.Server(this.server, {
          cors: {
              origin: process.env.CLIENT_HOST || true
          }
      });
      this.config();
      this.routes();
      this.start();
  }

  config(){
      dotenv.config();
      this.app.use(cors({
          origin: "*"
      }));
      this.app.use(express.json());
  }

  routes(){
  }

  start(){
    this.io.on('connection', (socket)=>{
      const {id_chat} = socket.handshake.query;
      if(id_chat){
        socket.join(`chat:${id_chat}`);
      }
      new ChatListeners(this.io, socket);
    });

    this.server.listen(parseInt(process.env.SERVER_HOST||'3000'), '10.153.50.142');
  }
}

const app = new App();