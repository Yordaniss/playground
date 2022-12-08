import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCookies, setCookie } from "cookies-next";
import { useForm } from "react-hook-form";

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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const data = getValues();

    fetch("/api/user/sign_in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(async (data) => {
      const responseData = await data.json();
      if (responseData.success) {
        setCookie("token", responseData.token);

        router.push("/");
      }
    });
  };

  return (
    <div className="outer-container">
      <div className="sign-in-outer-container">
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
    </div>
  );
};

export default Login;
