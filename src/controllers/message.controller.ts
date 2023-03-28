import IMessage from 'interfaces/IMessage';
import {Server, Socket} from 'socket.io';

const chatController = (io: Server, socket: Socket) => {

    
    const chatJoin = async (id_room?:string)=>{
        if(id_room){
            socket.join(`room:${id_room}`);
        }        
    };

    const chatMessage = async (message:IMessage, id_room?:string)=>{
        if(id_room){
            io.to(`room:${id_room}`).emit('chat:message', message);
        }else{
            io.emit('chat:message', message);
        }
    };

    // socket events
    socket.on("chat:join", chatJoin);
    socket.on("chat:message", chatMessage);
};

export default chatController;