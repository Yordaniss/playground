import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { useForm } from "react-hook-form";
import useHttpRequest from "../../hooks/useHttpRequest";
import ModuleWindow from "../../UI/ModuleWindow";

const Register = () => {
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
    sendRequest: signUp,
  } = useHttpRequest();
  const [signUpError, setsignUpError] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const data = getValues();
    setsignUpError("");

    signUp(
      {
        url: "/api/user/sign_up",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
      (responseData: any) => {
        if (responseData.success) {
          setCookie("token", responseData.token);
          router.push("/");
        } else if (!responseData.success) {
          setsignUpError(responseData.data);
          router.push("/sign_up");
        }
      }
    );

    if (fetchError) {
      router.push("/sign_up");
    } else if (signUpError === "") router.push("/");
  };

  return (
    <div className="sign-up-outer-container">
      {fetchError && (
        <ModuleWindow
          type="ERROR"
          message={`Something went wrong... :(\n\n${
            signUpError ? signUpError : fetchError
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
          message="Signing you up..."
          image={{
            src: "/images/post-office.svg",
            className: "sending-post-animation",
          }}
          blur="addPost-blur"
        ></ModuleWindow>
      )}
      <form className="sign-up" onSubmit={handleSubmit}>
        <div className="sign-up__inner-container">
          <label htmlFor="sign-up-username">Username</label>
          <input
            id="sign-up-username"
            className={`input ${errors.username && "error"}`}
            type="text"
            {...register("username", {
              required: "Username is required :3",
            })}
          />
          {errors.username && (
            <p className="error-message">{errors.username?.message}</p>
          )}
          <label htmlFor="sign-up-email">Email</label>
          <input
            id="sign-up-email"
            className={`input ${errors.email && "error"}`}
            type="text"
            {...register("email", {
              required: "Your email is also needed ^_^",
            })}
          />
          {errors.email && (
            <p className="error-message">{errors.email?.message}</p>
          )}
          <label htmlFor="sign-up-password">Password</label>
          <input
            id="sign-up-password"
            className={`input ${errors.password && "error"}`}
            type="password"
            required
            {...register("password", {
              required: "Password is required for your safety",
            })}
          />
          {errors.password && (
            <p className="error-message">{errors.password?.message}</p>
          )}
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

      <div className="have-account">
        <p>
          Already have an account?
          <br />
          <br />
        </p>
        <Link className="link-login" href={"/user/sign_in"}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
