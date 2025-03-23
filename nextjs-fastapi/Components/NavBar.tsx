"use client"
import {

  SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

function Navbar(){
  const path = usePathname();
  const router = useRouter();
  
  return(
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
          {path === "/" ? (
            <button className="btn btn-primary rounded-lg" onClick={() => router.push("./Report")}>
              Reports
            </button>
            ) : (
              <button className="btn btn-primary rounded-lg" onClick={() => router.push("./")}>
                New Chat
              </button>
            )
          }
          <UserButton />
        </SignedIn>
      </div>
    </div>
  )
};

export default Navbar;


