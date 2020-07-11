import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
        fullName: (parent) => {
            return `${parent.firstName} ${parent.lastName}`;
        },
        
        isFollowing: (parent, __, {request}) => {
            const { user } = request;
            // getting from parent
            const { id: parentId } = parent;
            console.log({id:parentId});
            try {
                // checking user database id has parentid
                // so user that requested is in database and check this user is in the list of followers
                return prisma.$exists.user({
                    AND: [{ id: parentId }, { followers_some: { id: user.id } }]
                });

            } catch (err) {
                console.log(err);
                return false;
            }
        },

        isSelf: (parent, _, {request}) => {
            const { user } = request;
            const { id: parentId } = parent;
            return user.id === parentId;
        },
        
        followers: parent => prisma.user({id: parent.id}).followers(),
        following: parent => prisma.user({id: parent.id}).following(),
        posts: parent => prisma.user({id: parent.id}).posts(),
        likes: parent => prisma.user({id: parent.id}).likes(),
        comments: parent => prisma.user({id: parent.id}).comments(),
        rooms: parent => prisma.user({id: parent.id}).rooms()
    },
}

