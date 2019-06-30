import React from "react";
import { withRouter } from "react-router-dom";
import Account from "./Account";
import { useAuth } from "../../common/AuthContext";
import { AUTH_LOG_OUT } from "../../common/AuthContext/actions";

const AccountView = () => {
    const [{ user }, authDispatch] = useAuth();

    const logout = () => {
        authDispatch({ type: AUTH_LOG_OUT });
    };

    return <Account user={user} onClickLogout={logout} />;
};

export default withRouter(AccountView);
