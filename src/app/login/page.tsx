import * as React from "react";

import Link from "next/link";
import LoginForm from "./components/login-form";

const Login = () => {
  return (
    <div>
      <h2 className="text-white text-3xl font-bold">Hello again</h2>
      <p className="text-gray-400">
        Enter the information you entered while registering
      </p>
      <LoginForm />
      <div className="absolute bottom-20 left-0 right-0 m-auto text-white flex justify-center ">
        <span>Don{"'"}t you have an account?</span>
        <Link href="/register" className="text-primary pl-2">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
