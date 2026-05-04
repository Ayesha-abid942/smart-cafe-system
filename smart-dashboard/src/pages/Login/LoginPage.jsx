import React, { useState } from "react";
import Welcome from "./Welcome";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const LoginPage = () => {
    const [page, setPage] = useState("welcome");

    return (
        <>
            {page === "welcome" && (
                <Welcome onGetStarted={() => setPage("signin")} />
            )}

            {page === "signin" && (
                <SignIn
                    onBack={() => setPage("welcome")}
                    onForgotPassword={() => alert("Reset link sent")}
                    onCreateAccount={() => setPage("signup")}
                />
            )}

            {page === "signup" && (
                <SignUp
                    onBack={() => setPage("welcome")}
                    onSignIn={() => setPage("signin")}
                />
            )}
        </>
    );
};

export default LoginPage;