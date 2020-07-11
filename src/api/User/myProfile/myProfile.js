import { prisma } from "../../../../generated/prisma-client";

export default{
    Query: {
        myProfile: async (_, __, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const userProfile = await prisma.user({ id: user.id });
            const userPost = await prisma.user({id: user.id}).posts();
            return { user: userProfile, posts: userPost };
        }
    }
};