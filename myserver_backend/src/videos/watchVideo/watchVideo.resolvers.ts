import prisma from "../../prisma";

export default {
  Query: {
    watchVideo: async (root: any, args: any, context: any, info: any) => {
      try {
        const { id } = args;

        const result = await prisma.video.findUnique({
          where: {
            id,
          },
        });

        console.log(result);

        return {
          result: true,
        };
      } catch (error) {
        return {
          result: false,
          error,
        };
      }
    },
  },
};
