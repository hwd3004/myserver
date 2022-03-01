import { gql, useReactiveVar, useMutation } from "@apollo/client";
import { loginStateVar } from "../../src/apollo";
import { useForm } from "react-hook-form";
import Router from "next/router";
import { ChangeEvent } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const Upload = () => {
  interface VideoUploadForm {
    title: String;
    attachment: String;
    artist: String;
    caption: String;
    errorMsg: {
      message: String;
    };
  }

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<VideoUploadForm>();

  const clearError = () => {
    clearErrors("errorMsg");
  };

  const onSubmitValid = (data: Object) => {
    console.log("onSubmitValid data : ", data);

    const { title, attachment, artist, caption } = getValues();

    upload_video_mutation({
      variables: {
        title,
        caption,
        attachment: attachment[0],
        artist,
      },
    });
  };

  const UPLOAD_VIDEO = gql`
    mutation Mutation($title: String!, $attachment: Upload!, $caption: String!, $artist: String!) {
      uploadVideo(title: $title, attachment: $attachment, caption: $caption, artist: $artist) {
        result
        error
      }
    }
  `;

  const onCompleted = (data: any) => {
    console.log("onCompleted data : ", data);

    Router.push("/video");
  };

  const [upload_video_mutation, { loading, data, error }] = useMutation(UPLOAD_VIDEO, { onCompleted });

  // https://merrily-code.tistory.com/157
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
  };

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h1>Upload</h1>

      <form onSubmit={handleSubmit(onSubmitValid)}>
        <input
          {...register("attachment", {
            required: true,
          })}
          type="file"
          accept="video/*"
          onChange={onChange}
        />
        {errors.attachment && (
          <>
            <br />
            <span>attachment error</span>
          </>
        )}

        <br />

        <input
          {...register("title", {
            required: true,
          })}
          onChange={clearError}
          placeholder="title"
          type="text"
        />
        {errors.title && (
          <>
            <br />
            <span>title error</span>
          </>
        )}

        <br />

        <input
          {...register("artist", {
            required: true,
          })}
          onChange={clearError}
          placeholder="artist"
          type="text"
        />
        {errors.artist && (
          <>
            <br />
            <span>artist error</span>
          </>
        )}

        <br />

        <input
          {...register("caption", {
            required: true,
          })}
          onChange={clearError}
          placeholder="caption"
          type="text"
        />
        {errors.artist && (
          <>
            <br />
            <span>caption error</span>
          </>
        )}

        <br />

        <button type="submit">submit</button>

        {errors.errorMsg && (
          <>
            <br />
            <span>{errors?.errorMsg?.message}</span>
          </>
        )}
      </form>
    </div>
  );
};

export default Upload;
