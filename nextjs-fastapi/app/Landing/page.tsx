import { SignIn, SignInButton, SignUp, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";
import Router from "next/router";

export default function LandingPage(){

    return(
        <>
            <div className="hero min-h-[93vh]" style={{backgroundImage: `url('./nurse.jpg')`}}>
                <div className="hero-overlay"></div>
                <div className="hero-content text-center">
                    <div className="max-w-lg">
                        <h1 className="text-5xl font-bold p-2">Hello There!</h1>
                        <h4 className="text-xl font-semibold">Are you also tired of waiting in line at the hospital? <br/>Even for minor medical advice</h4>
                        <p className="py-6">
                            Nursai is here to help.
                        </p>
                        <div className="btn w-sm btn-outline btn-primary">
                            <SignInButton />
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="card lg:card-side bg-base-100 shadow-sm">
                <figure>
                    <img
                        src="./nurse.jpg"
                        alt="Nurse" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Introduction</h2>
                    <p>Don't have an account yet! Create one and get started.</p>
                    <div className="card-actions justify-end">
                        <SignUpButton className="btn btn-outline btn-primary" />
                    </div>
                </div>
            </div> */}
        </>
    )
}