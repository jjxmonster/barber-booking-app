import React, { FunctionComponent } from "react";

import { Button } from "components/ui/button";
import Link from "next/link";
import Logo from "./logo";

const styles = {
  navbar: "w-full py-5 flex justify-between",
  buttons_wrapper: "flex gap-5",
};

const NavBar: FunctionComponent = () => {
  return (
    <nav className={styles.navbar}>
      <Logo />
      <div className={styles.buttons_wrapper}>
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/register">Register</Link>
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
