import { Button } from "antd";
import clsx from "clsx";
import { Link } from "react-router-dom";
import Container from "../../Components/Container/Container";
import LoginForm from "../../Components/Forms/LoginForm";

/* import local components */

const LoginPage = () => {
  return (
    <div className="login-page h-full">
      <Container className="h-full">
        <div
          className={clsx(
            "wrapper",
            "flex justify-center items-center flex-col gap-10",
            "h-full",
            "max-w-xl mx-auto"
          )}
        >
          <div className="content w-full max-w-md bg-pickled-bluewood-300/10 rounded-xl">
            <div className="form-wrapper py-8 px-9">
              <div className="form-header mb-8 last:mb-0">
                <h3 className="text-2xl text-center uppercase font-semibold tracking-wide text-pickled-bluewood-500">
                  login form
                </h3>
              </div>
              <div className="form-body mb-8">
                <LoginForm layout="vertical" size="large" />
              </div>
              <div className="form-footer flex items-center justify-center text-lg">
                <p className="mb-0 text-register">
                  Don't have account ?
                  <Link
                    className="link text-indigo-400 hover:text-red-500 ml-2 hover:underline transition-all duration-500"
                    to="/register"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
