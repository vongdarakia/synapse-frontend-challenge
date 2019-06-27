import React from "react";
import { withRouter } from "react-router-dom";
import AuthenticatedHome from "./AuthenticatedHome";
import { useAuthState } from "../../../common/AuthContext";

const AuthenticatedHomeView = ({ history }) => {
    const { user } = useAuthState();

    return <AuthenticatedHome user={user} />;
};

export default withRouter(AuthenticatedHomeView);
