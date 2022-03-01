```javascript
import Link from "next/link";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Pagination from "../../components/Pagination";

const VideosSC = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const video = () => {
  const VIDEOS_QUERY = gql`
    query Query($skip: Int, $take: Int) {
      videoList(skip: $skip, take: $take) {
        videos {
          id
          title
          attachment
          attachmentUrl
          caption
          hashtags {
            id
            hashtag
          }
          artist
        }
        totalPage
      }
    }
  `;

  const router = useRouter();
  const path = router.asPath;
  const take = 3;
  const skip = parseInt(path.split("page=")[1]) * take - take || 0;

  const { data, loading, error, refetch } = useQuery(VIDEOS_QUERY, {
    variables: {
      skip,
      take,
    },
  });

  const [isLoading, setIsloading] = useState(true);

  interface iVideo {
    id: number;
    title: string;
    attachment: string;
    attachmentUrl: String;
    artist: string;
    caption: string;
    hashtags: [iHashtag];
  }

  interface iHashtag {
    id: number;
    hashtag: string;
  }

  const [videos, setVideos] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    if (loading) {
      setIsloading(true);
    } else {
      setIsloading(false);
    }
  }, [loading]);

  useEffect(() => {
    const callRefetch = async () => {
      const result = await refetch();
      // console.log(result);
      // console.log(result.data.videoList.videos)
      // console.log(result.data.videoList.totalPage)
      setVideos(result.data.videoList.videos);
      setTotalPage(result.data.videoList.totalPage);
    };

    callRefetch();
  }, [path]);

  // useEffect(() => {
  //   console.log("totalPage : ", totalPage);
  // }, [totalPage]);

  // const Pagination = () => {
  //   const arr = [];
  //   for (let index = 1; index <= totalPage; index++) {
  //     // console.log(index);
  //     arr.push(
  //       <Link key={index} href={`/video?page=${index}`}>
  //         <button>{index}</button>
  //       </Link>
  //     );
  //   }

  //   return <div>{arr}</div>;
  // };

  // pagination();

  return (
    <>
      <h1>Video</h1>

      {isLoading && (
        <div>
          <h1>Loading...</h1>
        </div>
      )}

      <VideosSC>
        {videos.map((item: iVideo, index) => {
          return (
            <div key={index}>
              <video controls width="250px" src={` http://localhost:4000${item.attachmentUrl}`}></video>
              <p>
                {item.id} | {item.title}
              </p>
            </div>
          );
        })}
      </VideosSC>

      <Pagination totalPage={totalPage} />

      <Link href={`/video/upload`}>
        <button>upload</button>
      </Link>
    </>
  );
};

export default video;
```
