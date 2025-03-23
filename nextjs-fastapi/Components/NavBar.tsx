"use client"
import {

  SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => (
  <div className="navbar bg-base-110 ">
    <div className="flex-1">
      <a className="btn btn-ghost text-xl">NURSAI</a>
    </div>
    <div className="flex-none flex gap-4">
        <SignedOut>
            <SignInButton />
            <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
    </div>
  </div>
);

export default Navbar;


