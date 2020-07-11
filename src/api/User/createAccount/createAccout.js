import { prisma } from '../../../../generated/prisma-client';
export default{
    Mutation:{
        createAccount: async(_, args) => {
            const {name, email, firstName="", lastName="", bio="" } = args;
            const exist = await prisma.$exists.user({email});
            if(exist){
                throw Error("This username is already exist.");
                return false;
            }
            try{
                const user = await prisma.createUser({name, email, firstName, lastName, bio});
            } catch (err){
                console.log("Cannot make new account.");
                console.log(err);
                return false;
            }
            return true;
        }
    }
};