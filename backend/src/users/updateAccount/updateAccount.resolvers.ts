import prisma from "../../prisma";
import { checkAuthResolver } from "../users.util";
import bcrypt from "bcrypt";

const resolver = async (root: any, args: any, context: any, info: any) => {
  try {
    const { password, userName } = args;

    const { loggedInUser } = context;

    let newHashPassword: any;

    if (password) {
      newHashPassword = await bcrypt.hash(password, 10);
    }

    await prisma.user.update({
      where: {
        id: loggedInUser.id,
      },
      data: {
        userName,
        ...(newHashPassword && { password: newHashPassword }),
      },
    });

    return {
      result: true,
    };
  } catch (error) {
    return {
      result: false,
      error: "can't change account.",
    };
  }
};

export default {
  Mutation: {
    updateAccount: checkAuthResolver(resolver),
  },
};
