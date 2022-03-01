import prisma from "../prisma";

export default {
  Hashtag: {
    videos: async (parent: any) => {
      return await prisma.video.findMany({
        where: { id: parent.id },
      });
    },
  },
  Video: {
    user: async (parent: any) => {
      const { authorId } = parent;

      return await prisma.user.findUnique({ where: { id: authorId } });
    },
    hashtags: async (parent: any) => {
      const videoId: number = parent.id;

      // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#some
      const result = await prisma.hashtag.findMany({
        where: {
          videos: {
            // https://github.com/nohsangwoo/instaclone-backend-v3
            // where의 오퍼레이터로 some,every,none을 사용할수있음
            // some : 제공하는 검색어의 일부라도 포함된다면 결과값에 포함하여 반환
            // every : 조건에 완벽하게 부합하는 결과값만 반환
            // none : 조건에 부합하는 값을 제외한 결과값을 반환(like a omit)
            some: {
              id: videoId,
            },
          },
        },
      });

      return result;
    },
  },
  Query: {
    videos: async (root: any, args: any, context: any, info: any) => {
      try {
        // console.log("videos 호출");
        // console.log("args : ", args);
        // console.log("context :", context);

        const { skip, take } = args;

        const count = await prisma.video.count();
        // console.log(count);

        // https://nomadcoders.co/instaclone/lectures/2470
        // 댓글에 include와 computed fields의 차이 설명
        const result = await prisma.video.findMany({
          skip,
          take,
          orderBy: {
            id: "desc",
          },
          include: {
            Artist: true,
            // User: true,
            // hashtags: true,
          },
        });

        // console.log(result);

        return result;
      } catch (error) {
        return error;
      }
    },
    videoList: async (root: any, args: any, context: any, info: any) => {
      try {
        // console.log("videos 호출");
        // console.log("args : ", args);
        // console.log("context :", context);

        const { skip, take } = args;

        const count = await prisma.video.count();
        // console.log(typeof count);

        const temp: number = count / take;

        // console.log((temp | 0) + 1);
        const totalPage = (temp | 0) + 1;

        // https://nomadcoders.co/instaclone/lectures/2470
        // 댓글에 include와 computed fields의 차이 설명
        const videos = await prisma.video.findMany({
          skip,
          take,
          orderBy: {
            id: "desc",
          },
          include: {
            Artist: true,
            // User: true,
            // hashtags: true,
          },
        });

        return {
          videos,
          totalPage,
        };
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
};
