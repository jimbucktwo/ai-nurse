import { SignIn, SignInButton, SignUp, SignUpButton } from "@clerk/nextjs";

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
            <div>
                <div className="card lg:card-side bg-base-100 shadow-sm">
                    <figure>
                        <img
                            src="./handshake.jpeg"
                            alt="Nurse" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Introduction</h2>
                        <p>NursAI is an online platform dedicated to provide users simple answers to their puzzling medical questions</p>
                    </div>
                </div>
                <div className="card lg:card-side bg-base-100 shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title">Goals</h2>
                        <p>Achieve the level of proficience you deserve</p>
                    </div>
                    <figure>
                        <img
                            src="./goals.jpeg"
                            alt="Nurse" />
                    </figure>
                </div>
                <div className="card lg:card-side bg-base-100 shadow-sm">
                    <figure>
                        <img
                            src="./plans.png"
                            alt="Nurse" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Future Plans</h2>
                        <p>Things Yet to Come!</p>
                        <ul>
                            <li>Integration with Wearable Devices</li>
                            <li>Live Data with Epic</li>
                            <li>Share Diagnosis with Concerned Family</li>
                        </ul>
                    </div>
                </div>
                <div className="card lg:card-side bg-base-100 shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title">Get Started</h2>
                        <p>Don&apos;t have an account yet! Create one and get started.</p>
                        <div className="card-actions justify-start">
                            <div className="btn btn-outline btn-primary" ><SignUpButton /></div>
                        </div>
                    </div>
                    <figure>
                        <img
                            src="./start.jpeg"
                            alt="Nurse" />
                    </figure>
                </div>
            </div>
            
        </>
    )
}