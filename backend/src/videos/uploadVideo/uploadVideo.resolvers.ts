import prisma from "../../prisma";
import { checkAuthResolver } from "../../users/users.util";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import { ReadStream } from "fs-capacitor";
import { GraphQLUpload } from "graphql-upload";
import { cwd } from "process";

// 파일 업로드 2
import { finished } from "stream/promises";
import { hash } from "bcrypt";
const resolver = async (root: any, args: any, context: any, info: any) => {
  try {
    // console.log("args : ", args);
    // console.log("context : ", context);

    const { title, caption, attachment, artist } = await args;
    console.log(attachment);

    const getHashtag: [string] = await caption.match(/#[\w]+/g);
    console.log(getHashtag);

    let hashtagObjs;

    if (getHashtag) {
      hashtagObjs = getHashtag.map((hashtag) => {
        return {
          where: {
            hashtag,
          },
          create: {
            hashtag,
          },
        };
      });
    }

    const { filename, mimetype, encoding, createReadStream } = await attachment;

    const stream: ReadStream = createReadStream();
    // console.log(stream);

    const {
      loggedInUser: { id },
    } = context;

    const folderName = "video";

    const currentDir = cwd();

    const uploads = `uploads`;

    const uploadDir = `${folderName}/${id}/${Date.now()}`;
    // console.log(uploadDir);

    const temp = `${currentDir}/${uploads}/${uploadDir}`.split("/");
    // console.log(temp);

    let dirStr = "";

    for (let index = 0; index < temp.length; index++) {
      // 한 단계의 폴더만 생성함
      // https://itinerant.tistory.com/55
      // [nodejs] 폴더 없으면 생성하도록 하는 방법
      // !existsSync(localDir) && mkdirSync(localDir);
      // !existsSync(temp[index]) && mkdirSync(temp[index]);

      dirStr += temp[index] + "/";
      // console.log(dirStr);
      !existsSync(dirStr) && mkdirSync(dirStr);
    }

    const out = await createWriteStream(`${currentDir}/${uploads}/${uploadDir}/${filename}`);
    // // console.log(out);

    await stream.pipe(out);
    await finished(out);

    const attachmentUrl = `/static/${uploadDir}/${filename}`;
    // console.log(attachmentUrl);

    const result = await prisma.video.create({
      data: {
        title,
        caption,
        attachment: filename,
        attachmentUrl,
        User: {
          connect: {
            id,
          },
        },
        hashtags: {
          connectOrCreate: hashtagObjs,
        },
        Artist: {
          connectOrCreate: {
            where: {
              artist,
            },
            create: {
              artist,
            },
          },
        },
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
};

export default {
  Upload: GraphQLUpload,
  Mutation: {
    uploadVideo: checkAuthResolver(resolver),
  },
};
