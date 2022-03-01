import { gql, useLazyQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { userLogin } from "../src/apollo";
import { useRouter } from "next/router";

const Login = () => {
  const LOGIN_QUERY = gql`
    query Query($userId: String!, $password: String!) {
      login(userId: $userId, password: $password) {
        result
        token
        error
      }
    }
  `;

  const onCompleted = (data: any) => {
    // console.log(data);

    const {
      login: { result, token, error },
    } = data;

    if (!result) {
      console.log("onCompleted error : ", error);

      return setError("errorMsg", { message: error });
    }

    if (token) {
      userLogin(token);
    }

    router.push("/");
  };

  // useQuery는 콜백함수로 쓸 수 없음
  const [login_query, { loading }] = useLazyQuery(LOGIN_QUERY, { onCompleted });

  interface LoginForm {
    userId: String;
    password: String;
    errorMsg: {
      message: String;
    };
  }

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
    clearErrors,
  } = useForm<LoginForm>({
    defaultValues: {
      userId: router?.query?.userId || "",
      password: router?.query?.password || "",
    },
  });

  const onSubmitValid = (data: any) => {
    console.log(data);

    const { userId, password } = getValues();

    login_query({ variables: { userId, password } });
  };

  // form 전송 실패 시 에러가 발생하는데, input이 onChange 될 때마다 clear 해주지 않으면
  // 새로고침을 해야만 form의 submit이 다시 활성화됨
  const clearLoginError = () => {
    clearErrors("errorMsg");
  };

  return (
    <div>
      <h1>login</h1>

      <form onSubmit={handleSubmit(onSubmitValid)}>
        <input
          {...register("userId", {
            required: true,
            minLength: 4,
          })}
          type={"text"}
          placeholder="Id"
          onChange={clearLoginError}
        />
        {errors.userId && (
          <>
            <br />
            <span>Id required and longer than 4 chars.</span>
          </>
        )}
        <br />
        <input
          {...register("password", {
            required: true,
            minLength: 4,
          })}
          type={"password"}
          placeholder="Password"
          onChange={clearLoginError}
        />
        {errors.password && (
          <>
            <br />
            <span>Password required and longer than 4 chars.</span>
          </>
        )}
        <br />
        {router.query.queryMsg && (
          <>
            <span>{router?.query?.queryMsg}</span>
            <br />
          </>
        )}
        <button type="submit">Log in</button>
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

export default Login;
