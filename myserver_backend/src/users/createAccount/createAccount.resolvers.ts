import prisma from "../../prisma";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (root: any, args: any, context: any, info: any) => {
      try {
        const { userId, userName, password, email } = args;

        const checkUserId = await prisma.user.findFirst({
          where: {
            userId,
          },
        });

        const checkUserName = await prisma.user.findFirst({
          where: {
            userName,
          },
        });

        const checkEmail = await prisma.user.findFirst({
          where: {
            email,
          },
        });

        if (checkUserId) return { result: false, error: "Id is already exists." };
        if (checkUserName) return { result: false, error: "username is already exists." };
        if (checkEmail) return { result: false, error: "email is already exists." };

        const hashPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
          data: {
            userId,
            userName,
            password: hashPassword,
            email,
          },
        });

        return {
          result: true,
        };
      } catch (error) {
        return {
          result: false,
          error: "can't create account.",
        };
      }
    },
  },
};
