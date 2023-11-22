"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

export const LoginButton = () => {
  return (
    <Link className="mr-[10px]" href="/login">
      Sign in
    </Link>
  );
};

export const RegisterButton = () => {
  return (
    <Link href="/register" className="mr-[10px]" >
      Register
    </Link>
  );
};

export const LogoutButton = () => {
  return (
    <button className="mr-[10px]"  onClick={() => signOut()}>
      Sign Out
    </button>
  );
};

export const ProfileButton = () => {
  return <Link href="/profile">Profile</Link>;
};
