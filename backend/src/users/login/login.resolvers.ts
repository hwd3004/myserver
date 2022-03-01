import prisma from "../../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Query: {
    login: async (root: any, args: any) => {
      const { userId, password } = args;

      const user = await prisma.user.findFirst({
        where: {
          userId,
        },
      });

      if (!user) return { result: false, error: "user not found." };

      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) return { result: false, error: "Incorrect password." };

      // https://stackoverflow.com/questions/66328425/jwt-argument-of-type-string-undefined-is-not-assignable-to-parameter-of-typ
      // 타입스크립트에서 jwt.sign 에러
      const token = jwt.sign({ id: user.id }, String(process.env.SECRET_KEY));

      return {
        result: true,
        token,
      };
    },
  },
};
