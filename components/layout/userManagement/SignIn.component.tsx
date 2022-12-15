import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { useForm } from "react-hook-form";
import useHttpRequest from "../../hooks/useHttpRequest";
import ModuleWindow from "../../UI/ModuleWindow";

const Login = () => {
  const router = useRouter();
  const {
    register,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
    shouldFocusError: false,
  });

  const {
    isLoading,
    error: fetchError,
    sendRequest: signIn,
  } = useHttpRequest();
  const [signInError, setSignInError] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const data = getValues();
    setSignInError("");

    signIn(
      {
        url: "/api/user/sign_in",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
      (responseData: any) => {
        if (responseData.success) {
          setCookie("token", responseData.token);
          router.push("/");
        } else if (!responseData.success) {
          setSignInError(responseData.data);
          router.push("/sign_in");
        }
      }
    );

    if (fetchError) {
      router.push("/sign_in");
    } else if (signInError === "") router.push("/");
  };

  return (
    <div className="sign-in-outer-container">
      {fetchError && (
        <ModuleWindow
          type="ERROR"
          message={`Something went wrong... :(\n\n${
            signInError ? signInError : fetchError
          }`}
          image={{
            src: "/images/sad-unicorn.svg",
            className: "sending-post-animation",
          }}
          blur="addPost-blur"
        ></ModuleWindow>
      )}
      {isLoading && (
        <ModuleWindow
          type="INFO"
          message="Signing you in..."
          image={{
            src: "/images/post-office.svg",
            className: "sending-post-animation",
          }}
          blur="addPost-blur"
        ></ModuleWindow>
      )}
      <form className="sign-in" onSubmit={handleSubmit}>
        <div className="sign-in__inner-container">
          <label htmlFor="sign-in-username">Username</label>
          <input
            className="input"
            type="text"
            id="sign-in-username"
            {...register("username", {
              required: "Username is required :3",
            })}
          />
          <label>Password</label>
          <input
            className="input"
            type="password"
            {...register("password", {
              required: "Password is required ^_^",
            })}
          />
        </div>
        <div className="formButtons">
          <input
            disabled={!isValid}
            className="button submit"
            type="submit"
            value="submit"
          />
          <input className="button cancel" type="reset" value="cancel" />
        </div>
      </form>

      <div className="no-account">
        <p>
          No account yet?
          <br />
          You can register here...
          <br />
          <br />
        </p>
        <Link className="link-register" href="/user/sign_up">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
