import React from "react";
import clsx from "clsx";
import Container from "../../Components/Container/Container";
import RegisterForm from "../../Components/Forms/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="register-page h-full">
      <Container className="h-full flex justify-center align-center py-5">
        <div
          className={clsx(
            "wrapper",
            "flex justify-center items-center flex-col gap-10",
            "max-w-[80%] mx-auto border-2 p-5 rounded-xl"
          )}
        >
          <h2 className="title font-bold uppercase tracking-wide text-center md:text-5xl text-4xl border-b-2">
            Register
          </h2>

          <RegisterForm layout="vertical" size="large" />

          <div className="content w-[700px] max-w-full">
            <div className="form-header text-xl text-center font-semibold tracking-wide mb-10">
              <span>Already have an account?</span>{" "}
              <a href="/login">Log in now!</a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RegisterPage;
