import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation:{
        editProfile: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { name, email, firstName, lastName, bio, avatar } = args;
            const { user } = request;
            // server will wait for answer of return, so don't have to write the await
            return prisma.updateUser({
                where: { id: user.id },
                data: {
                    name, email, firstName, lastName, bio, avatar
                }
            });
        }
    }
}