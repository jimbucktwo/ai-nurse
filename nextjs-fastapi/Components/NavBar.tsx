"use client";
import LoginModal from "./LoginModal";
import { useState } from "react";

const Navbar = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    
    const handleLoginClick = () => {
        setIsLoginModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsLoginModalOpen(false);
    };
    
    if (isLoginModalOpen) {
        return <LoginModal onClose={handleCloseModal} />;
}
    return (
  <div className="navbar bg-base-100 shadow-sm">
    <div className="flex-none">
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
    </div>
    <div className="flex-1">
      <a className="btn btn-ghost text-xl">NURSAI</a>
    </div>
    <div className="flex gap-2 ml-4">
      <button className="btn btn-outline btn-sm" onClick ={handleLoginClick} >Login</button>
      <button className="btn btn-primary btn-sm">Sign Up</button>
    </div>
    {isLoginModalOpen && <LoginModal onClose={handleCloseModal} />}
  </div>
)};

export default Navbar;
