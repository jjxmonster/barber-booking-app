"use client";

import React, { FunctionComponent } from "react";
import { signOut, useSession } from "next-auth/react";

import { Button } from "components/ui/button";
import Link from "next/link";
import Logo from "./logo";
import { useParams, usePathname, useRouter } from "next/navigation";

const styles = {
  navbar: "w-full py-5 flex justify-between",
  buttons_wrapper: "flex gap-5",
};

const pathnamesToHide = ["/login", "/register"];

const NavBar: FunctionComponent = () => {
  const { data } = useSession();
  const pathname = usePathname();

  if (pathnamesToHide.includes(pathname)) {
    return null;
  }

  return (
    <nav className={styles.navbar}>
      <Logo />
      <div className={styles.buttons_wrapper}>
        {data ? (
          <div className="flex items-center gap-5">
            <span className="text-white font-bold text-xl">
              {data?.user.name}
            </span>
            <Button onClick={() => signOut()}>Logout</Button>
          </div>
        ) : (
          <>
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/register">Register</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
