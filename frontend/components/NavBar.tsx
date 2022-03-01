import Link from "next/link";
import { useEffect, useState } from "react";
import { loginStateVar, userLogout } from "../src/apollo";
import { useReactiveVar } from "@apollo/client";
import styled from "styled-components";

const NavBarSC = styled.nav`
  padding: 20px 20px 0px 20px;
`;

const NavBar = () => {
  let loginState = false;

  if (typeof window !== "undefined") {
    loginState = useReactiveVar(loginStateVar);
  }

  return (
    <NavBarSC>
      <Link href={`/`}>Home</Link>
      <br />
      <Link href={`/video`}>
        <button>video</button>
      </Link>
      &nbsp;
      {!loginState ? (
        <>
          <Link href={`/login`}>Log in</Link>
          &nbsp;
          <Link href={`/signup`}>Sign up</Link>
          &nbsp;
        </>
      ) : (
        <>
          <Link href={`/account`}>
            <button>my account</button>
          </Link>
          &nbsp;
          <button onClick={() => userLogout()}>Log out</button>
          &nbsp;
        </>
      )}
    </NavBarSC>
  );
};

export default NavBar;
