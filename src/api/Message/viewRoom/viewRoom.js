import { prisma } from "../../../../generated/prisma-client";

export default{
    Query: {
        viewRoom: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { id } = args;
            const { user } = request;
            const amIIn = await prisma.$exists.room({
                participants_some: {
                    id: user.id
                }
            });

            if(amIIn){
                console.log(await prisma.room({id}));
                return prisma.room({id});
            }else{
                throw Error("You can't see this");
            }
        }
    }
}