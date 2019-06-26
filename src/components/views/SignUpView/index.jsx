import React, { useState } from "react";
import SignUp from "./SignUp";
import { SynapseAPI } from "../../../api/synapse-api";

const SignUpView = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const joinDave = async data => {
        try {
            setLoading(true);
            const user = await SynapseAPI.createUser(data);

            // authenticate and go to home page
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
    return <SignUp onClickJoin={joinDave} loading={loading} error={error} />;
};

export default SignUpView;
