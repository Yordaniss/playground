import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";
import { useForm } from "react-hook-form";

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

  const sumbitForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const data = getValues();

    fetch("/api/user/sign_up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
      }),
    }).then(async (data) => {
      const responseData = await data.json();
      if (responseData.success) {
        setCookie("token", responseData.token);

        router.push("/");
      }
    });
  };

  return (
    <div className="sign-up-outer-container">
      <form className="sign-up" onSubmit={sumbitForm}>
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
