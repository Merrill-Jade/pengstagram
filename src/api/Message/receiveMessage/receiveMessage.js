import { prisma } from "../../../../generated/prisma-client";

export default{
    Subscription: {
        receiveMessage: {
            subscribe: (_, args) => {
                const { roomId } = args;
                return prisma.$subscribe.message({
                    AND: [
                        {mutation_in: "CREATED"},
                        {
                            node: { room: {id: roomId} }
                            
                        }
                    ]
                }).node();
            },
            resolve: payload => payload
        }
    }
}