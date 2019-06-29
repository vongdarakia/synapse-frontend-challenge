import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import SignUp from "./SignUp";
import Auth from "../../../auth";

const SignUpView = ({ history }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const joinDave = async data => {
        try {
            setLoading(true);
            const user = await Auth.signUp(data);

            // authenticate and go to home page
            history.push(`/mfa-validation/${user._id}`);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
    return <SignUp onClickJoin={joinDave} loading={loading} error={error} />;
};

export default withRouter(SignUpView);
