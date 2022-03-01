import prisma from "../prisma";
import jwt from "jsonwebtoken";

export const getUser = async (token: any) => {
  try {
    if (!token) {
      return null;
    }

    const data = jwt.verify(token, String(process.env.SECRET_KEY));

    // https://velog.io/@zue/does-not-exist-on-type
    const { id } = data as IToken;

    const user = await prisma.user.findUnique({ where: { id } });

    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const checkAuthResolver = (resolver: any) => {
  return (root: any, args: any, context: any, info: any) => {
    if (!context.loggedInUser) {
      return {
        result: false,
        error: "please log in.",
      };
    }

    return resolver(root, args, context, info);
  };
};
