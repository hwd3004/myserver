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

const Video = () => {
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

  const onCompleted = (data: any) => {
    // console.log("onCompleted");
    // console.log(data);
    const {
      videoList: { totalPage, videos },
    }: { videoList: { totalPage: number; videos: [] } } = data;

    // console.log(data.videoList.videos[0].attachmentUrl);

    // setTotalPage(totalPage);
    // setVideos(videos);
    setObj({ videos, totalPage });
  };

  const [videos_query, { data, loading, error, refetch }] = useLazyQuery(VIDEOS_QUERY, {
    variables: {
      skip,
      take,
    },
    onCompleted,
  });

  const [isLoading, setIsloading] = useState(true);

  interface iVideo {
    id: number;
    title: string;
    attachment: string;
    attachmentUrl: string;
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
  const [obj, setObj] = useState({ videos: [], totalPage: 0 });

  // useEffect(() => {
  //   if (loading) {
  //     setIsloading(true);
  //   } else {
  //     setIsloading(false);
  //   }
  // }, [loading]);

  useEffect(() => {
    const query = async () => {
      await videos_query();
    };
    query();
    if (!loading) {
      setIsloading(false);
    }
  }, [path]);

  return (
    <>
      <h1>Video</h1>

      {isLoading ? (
        <>
          <h1>Loading...</h1>
        </>
      ) : (
        <>
          <VideosSC>
            {obj.videos.map((item: iVideo, index) => {
              console.log("videos");
              return (
                <div key={index}>
                  <video controls width="250px" src={`http://localhost:4000${item.attachmentUrl}`}></video>
                  <p>
                    {item.id} | {item.title}
                  </p>
                </div>
              );
            })}
          </VideosSC>

          {/* <Pagination totalPage={totalPage} /> */}
          <Pagination totalPage={obj.totalPage} />

          <Link href={`/video/upload`}>
            <button>upload</button>
          </Link>
        </>
      )}
    </>
  );
};

export default Video;
