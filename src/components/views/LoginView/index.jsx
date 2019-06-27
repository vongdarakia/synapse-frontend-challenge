import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Login from "./Login";
import Auth from "../../../auth";
import { useAuthDispatch } from "../../common/AuthContext";
import { AUTH_SET_USER } from "../../common/AuthContext/actions";

const LoginView = ({ history }) => {
    const authDispatch = useAuthDispatch();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const login = async ({ email, password }) => {
        setLoading(true);

        try {
            const user = await Auth.login(email, password);

            if (user) {
                history.push("/");
                authDispatch({ type: AUTH_SET_USER, payload: user });
            }
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return <Login onSubmitLogin={login} loading={loading} error={error} />;
};

export default withRouter(LoginView);
