import * as React from "react";

import Link from "next/link";
import RegisterTabs from "app/register/components/register-tabs";

const Register = () => {
  return (
    <div>
      <h2 className="text-white text-3xl font-bold">Registration</h2>
      <RegisterTabs />
      <div className="absolute bottom-20 left-0 right-0 m-auto text-white flex justify-center ">
        <span>Already have an account?</span>
        <Link href="/login" className="text-primary pl-2">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Register;
