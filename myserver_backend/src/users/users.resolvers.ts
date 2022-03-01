import prisma from "../prisma";
import bcrypt from "bcrypt";

export default {
  Query: {
    users: async () => {
      try {
        const many = await prisma.user.findMany();

        console.log(many);

        return many;
      } catch (error) {
        return error;
      }
    },
  },
};
