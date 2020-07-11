import { prisma } from "../../../generated/prisma-client";

export default{
    Message: {
        toUser: parent => prisma.message({id: parent.id}).toUser(),
        fromUser: parent => prisma.message({id: parent.id}).fromUser()
    }
}