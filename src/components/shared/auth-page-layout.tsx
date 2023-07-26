import React, { FunctionComponent, ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";
import Logo from "./logo";

interface AuthPageLayoutProps {
  children: ReactNode;
}

const AuthPageLayout: FunctionComponent<AuthPageLayoutProps> = ({
  children,
}) => {
  return (
    <div className="w-full h-full flex inset-0 fixed">
      <div className="h-full w-1/2 relative opacity-30">
        <Image
          alt="brown wooden handled knife on brown wooden chopping board"
          layout="fill"
          objectFit="cover"
          src="https://images.unsplash.com/photo-1587909209111-5097ee578ec3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
        />
      </div>
      <div className="h-full w-1/2 flex items-center justify-center relative">
        <div className="absolute top-5 right-5">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthPageLayout;
