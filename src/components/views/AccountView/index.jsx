import React from "react";
import { withRouter } from "react-router-dom";
import Account from "./Account";
import { useAuth } from "../../common/AuthContext";
import { AUTH_LOG_OUT } from "../../common/AuthContext/actions";
import SynapseAPI from "../../../api/synapse-api";

const AccountView = () => {
    const [{ user }, authDispatch] = useAuth();

    const logout = () => {
        authDispatch({ type: AUTH_LOG_OUT });
    };

    const linkBankAccount = async () => {
        const nodes = await SynapseAPI.linkBankAccount(user._id);
        const checkingAccount = nodes.find(
            node => node.info.class === "CHECKING"
        );
        const transactions = [];

        // creates initial dummy transaction data for showcase purposes
        if (checkingAccount) {
            for (let i = 0; i < 5; i += 1) {
                transactions.push(
                    SynapseAPI.createDummyTransaction({
                        userId: user._id,
                        nodeId: checkingAccount._id,
                        amount: (Math.random() * 100).toFixed(2)
                    })
                );
            }
        }
        await Promise.all(transactions);

        // I know, alerts are bad
        alert("Fake bank successfully linked");
    };

    return (
        <Account
            user={user}
            onClickLogout={logout}
            onClickLinkBankAccount={linkBankAccount}
        />
    );
};

export default withRouter(AccountView);
