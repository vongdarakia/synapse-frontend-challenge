import React from "react";
import { withRouter } from "react-router-dom";
import UnauthenticatedHome from "./UnauthenticatedHome";

const UnauthenticatedHomeView = ({ history }) => {
    const login = () => {
        history.push("/login");
    };

    const signUp = () => {
        history.push("/sign-up");
    };

    return <UnauthenticatedHome onClickLogin={login} onClickSignUp={signUp} />;
};

export default withRouter(UnauthenticatedHomeView);
