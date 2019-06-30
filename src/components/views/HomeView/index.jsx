import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useAuthState } from "../../common/AuthContext";
import SynapseAPI from "../../../api/synapse-api";
import UnauthenticatedHome from "./UnauthenticatedHome";
import AuthenticatedHome from "./AuthenticatedHome";

const HomeView = ({ history }) => {
    const { user } = useAuthState();
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadTransactions = async () => {
            const data = await SynapseAPI.viewTransactions(user._id);

            if (data.trans) {
                setTransactions(data.trans);
            } else if (data.error) {
                setError(data.error.en);
            }
        };
        loadTransactions();
    }, []);

    if (user) {
        return (
            <AuthenticatedHome
                user={user}
                error={error}
                transactions={transactions}
            />
        );
    }

    const login = () => {
        history.push("/login");
    };

    const signUp = () => {
        history.push("/sign-up");
    };

    return <UnauthenticatedHome onClickLogin={login} onClickSignUp={signUp} />;
};

export default withRouter(HomeView);
