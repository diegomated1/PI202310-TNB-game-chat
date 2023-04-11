import IMessage from 'interfaces/IMessage';
import {Server, Socket} from 'socket.io';

export default class ChatListeners{
    io: Server;
    socket: Socket;

    constructor(io: Server, socket: Socket){
        this.socket = socket;
        this.io = io;
        this.listeners();
    }
    
    private chatJoin = async (id_room?:string)=>{
        if(id_room){
            this.socket.join(`room:${id_room}`);
        }        
    };

    private chatMessage = async (message:IMessage, id_room?:string)=>{
        if(id_room){
            this.io.to(`chat:${id_room}`).emit('chat:message', message);
        }else{
            this.io.emit('chat:message', message);
        }
    };

    // socket events
    listeners(){
        this.socket.on("chat:join", this.chatJoin);
        this.socket.on("chat:message", this.chatMessage);
    }
};