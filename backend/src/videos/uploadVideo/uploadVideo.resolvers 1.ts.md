```javascript
import prisma from "../../prisma";
import { checkAuthResolver } from "../../users/users.util";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import { ReadStream } from "fs-capacitor";
import { GraphQLUpload } from "graphql-upload";

// 파일 업로드 1
const resolver = async (root: any, args: any, context: any, info: any) => {
  try {
    // console.log("args : ", args);
    // console.log("context : ", context);

    const { title, caption, hashTags, attachment } = await args;

    // console.log(attachment);

    const { filename, createReadStream, mimetype, encoding } = await attachment.file;

    const {
      loggedInUser: { id },
    } = context;

    const readStream: ReadStream = createReadStream();

    // console.log(process.cwd());
    // 절대경로 얻음

    const folderName = "video";
    const localDir = `${process.cwd()}/uploads/${folderName}/${id}/${Date.now()}`;

    const temp = localDir.split("/");

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

    const writeStream = createWriteStream(`${localDir}/${filename}`);

    readStream.pipe(writeStream);

    const loc = `http://localhost:4000/static/${filename}`;
    console.log(loc);

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
  Mutation: {
    uploadVideo: checkAuthResolver(resolver),
  },
};
```
