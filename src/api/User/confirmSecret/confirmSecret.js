import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
    Mutation: {
        confirmSecret: async (_, args) => {
            const { email , loginSecret } = args;
            const user = await prisma.user({email});
            if(user.loginSecret === loginSecret){
                // login secret will update after once logged in
/*                await prisma.updateUser({
                    where: { id: user.id },
                    data: {
                        loginSecret: ""
                    }
                });
*/                // JWT
                return generateToken(user.id);
            }else{
                throw Error("Wrong email/secret combination");
            }
        }
    }
}