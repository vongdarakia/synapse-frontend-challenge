import React from "react";
import { withRouter } from "react-router-dom";
import LoggedOutHome from "./LoggedOutHome";

const LoggedOutHomeView = ({ history }) => {
    const login = () => {
        history.push("/login");
    };

    const signUp = () => {
        history.push("/sign-up");
    };

    return <LoggedOutHome onClickLogin={login} onClickSignUp={signUp} />;
};

export default withRouter(LoggedOutHomeView);
