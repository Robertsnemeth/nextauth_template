"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";

export const LoginButton = () => {
  return (
    <Link className="mr-[10px]" href="/login">
      <Button>Login</Button>
    </Link>
  );
};

export const RegisterButton = () => {
  return (
    <Link href="/register" className="mr-[10px]" >
      <Button>Register</Button>
    </Link>
  );
};

export const LogoutButton = () => {
  return (
    <Button  onClick={() => signOut()}>
      Sign Out
    </Button>
  );
};

export const ProfileButton = () => {
  return <Link href="/profile"><Button>Profile</Button></Link>;
};

export const HomeButton = () => {
  return <Link href="/"><Button variant="ghost">Home</Button></Link>;
}
