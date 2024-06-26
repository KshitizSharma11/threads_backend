
import UserService,{createUserPayload,getUserTokenPayload}  from "../../services/users";
const queries={
    getUserToken:async (_: any,payload:getUserTokenPayload)=>{
    const token = await UserService.getUserToken(payload);
    return token;
    },
    getCurrentLoggedInUser: async (_: any, parameters: any, context: any) => {
        if (context && context.user) {
          const id = context.user.id;
          const user = await UserService.getUserById(id);
          return user;
        }
        throw new Error("I dont know who are you");
      },
    };
const mutations={
    createUser: async (_: any, payload: createUserPayload) => {
        const res = await UserService.createUser(payload);
        return res.id;
      },
};
export const resolvers={queries,mutations};