import { useMutation, gql } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const Signup = () => {
  const CREATE_ACCOUNT = gql`
    mutation Mutation($userId: String!, $userName: String!, $password: String!, $email: String!) {
      createAccount(userId: $userId, userName: $userName, password: $password, email: $email) {
        result
        error
      }
    }
  `;

  const router = useRouter();

  const onCompleted = (data: any) => {
    console.log(data);

    const {
      createAccount: { result, error },
    } = data;

    if (!result) {
      console.log("onCompleted error : ", error);

      return setError("errorMsg", { message: error });
    }

    const { userId, password } = getValues();

    // https://velog.io/@sbinha/next.js-Router를-통해-props-기능-구현
    const query = { userId: String(userId), password: String(password), queryMsg: "Account created. Please log in." };

    router.push({ pathname: "/login", query });
  };

  const [signup_mutation, { loading }] = useMutation(CREATE_ACCOUNT, { onCompleted });

  interface SignupForm {
    userId: String;
    password: String;
    userName: String;
    email: String;
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
  } = useForm<SignupForm>();

  const onSubmitValid = (data: any) => {
    console.log(data);

    const { userId, userName, email, password } = getValues();

    signup_mutation({ variables: { userId, userName, email, password } });
  };

  const clearError = () => {
    clearErrors("errorMsg");
  };

  return (
    <div>
      <h1>sign up</h1>

      <form onSubmit={handleSubmit(onSubmitValid)}>
        <input
          {...register("userId", {
            required: true,
            minLength: 4,
          })}
          type="text"
          placeholder="Id"
          onChange={clearError}
        />
        {errors.userId && (
          <>
            <br />
            <span>Id required and longer than 4 chars.</span>
          </>
        )}
        <br />
        <input
          {...register("userName", {
            required: true,
            minLength: 4,
          })}
          type="text"
          placeholder="user name"
          onChange={clearError}
        />
        {errors.userName && (
          <>
            <br />
            <span>user name required and longer than 4 chars.</span>
          </>
        )}
        <br />
        <input
          {...register("password", {
            required: true,
            minLength: 4,
          })}
          type="password"
          placeholder="password"
          onChange={clearError}
        />
        {errors.password && (
          <>
            <br />
            <span>Password required and longer than 4 chars.</span>
          </>
        )}
        <br />
        <input
          {...register("email", {
            required: true,
            minLength: 4,
          })}
          type="email"
          placeholder="email"
          onChange={clearError}
        />
        {errors.email && (
          <>
            <br />
            <span>email required.</span>
          </>
        )}
        <br />
        <button type="submit">Sign up</button>
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

export default Signup;
