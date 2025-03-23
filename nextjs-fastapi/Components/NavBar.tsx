import {

  SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
  UserButton,
} from "@clerk/nextjs";

<<<<<<< Updated upstream
const Navbar = () => (
  <div className="navbar bg-base-110 ">
    <div className="flex-none">
      <SignedIn>
      <button className="btn btn-square btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block h-5 w-5 stroke-current"
        >
          {" "}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>{" "}
        </svg>
      </button>
      </SignedIn>
    </div>
    <div className="flex-1">
      <a className="btn btn-ghost text-xl">NURSAI</a>
    </div>
    <div className="flex-none flex gap-4">
=======
function Navbar(){
  const path = usePathname();
  const router = useRouter();
  
  return(
    <div className="navbar bg-base-110 ">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" onClick={() => router.push("./Landing")}>NURSAI</a>
      </div>
      <div className="flex-none flex gap-4">
>>>>>>> Stashed changes
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


