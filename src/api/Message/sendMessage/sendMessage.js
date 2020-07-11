import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        sendMessage: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { roomId, message, toId } = args;
            let room;
            // if chat room doesn't exist
            if(roomId === undefined){
                // should not be room with self
                if(user.id !== toId){
                    room = await prisma.createRoom({
                        participants: {
                            connect: [
                                { id: toId }, {id: user.id}
                            ]
                        }
                    });
                }
            }else{
                room = await prisma.room({ id: roomId });
            }

            if (!room) {
                throw Error("Cannot find room.");
            }
 
            const getTo = room.participants.filter(participant => participant.id !== user.id)[0];

            return prisma.createMessage({
                text: message, 
                fromUser: {
                    connect: { id: user.id }
                },
                toUser: {
                    connect: {
                        id: roomId ? getTo.id : toId
                    }
                },
                room: {
                    connect: {
                        id: room.id
                    }
                }
            });
        }
    }
}