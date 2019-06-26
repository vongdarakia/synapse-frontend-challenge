import React, { useState } from "react";
import SignUp from "./SignUp";
import { SynapseAPI } from "../../../api/synapse-api";

const SignUpView = () => {
    const [error, setError] = useState("");
    const joinDave = data => {
        try {
            SynapseAPI.createUser(data);
        } catch (error) {
            setError(error);
        }
    };
    return <SignUp onClickJoin={joinDave} error={error} />;
};

export default SignUpView;
