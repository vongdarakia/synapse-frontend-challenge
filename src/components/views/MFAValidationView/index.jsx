import React, { useState } from "react";
import MFAValidation from "./MFAValidation";
import { storeUser } from "../../../auth";
import SynapseAPI from "../../../api/synapse-api";
import { useAuthDispatch } from "../../common/AuthContext";
import { AUTH_SET_USER } from "../../common/AuthContext/actions";

const MFAValidationView = ({ match, history }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [pinSent, setPinSent] = useState(false);
    const authDispatch = useAuthDispatch();

    const mfaAction = async pin => {
        try {
            setLoading(true);
            const user = await SynapseAPI.viewUser(match.params.userId);
            let oauth;

            if (pin) {
                oauth = await SynapseAPI.validate2FAPin(
                    user._id,
                    user.refresh_token,
                    pin
                );

                if (oauth.error) {
                    throw new Error(oauth.error.en);
                }
                if (match.params.isSigningUp) {
                    storeUser(user._id, oauth);
                    const accounts = await SynapseAPI.linkBankAccount(user._id);
                    const transactionProcesses = [];

                    for (let i = 0; i < 10; i += 1) {
                        transactionProcesses.push(
                            SynapseAPI.createDummyTransaction({
                                userId: user._id,
                                nodeId: accounts[0]._id,
                                amount: (Math.random() * 10).toFixed(2)
                            })
                        );
                    }

                    await Promise.all(transactionProcesses);
                }
            } else {
                oauth = await SynapseAPI.select2FADevice(
                    user._id,
                    user.refresh_token,
                    user.phone_numbers[0]
                );
            }

            if (oauth.oauth_key) {
                // sending pin somehow returns an oauth_key sometimes, so we have to handle that
                await storeUser(user._id, oauth);
                authDispatch({ type: AUTH_SET_USER, payload: user });
            } else {
                // if oauth key isn't returned, show user that a pin was sent
                // unless there was a fingerprint not found error. Unsure what the cause of this is.
                // But MFA isn't working anymore, so I'm handling that to get through login
                if (oauth.error) {
                    throw new Error(oauth.error.en);
                }

                setPinSent(true);
                setLoading(false);
            }
        } catch (error) {
            if (error.message.includes("Fingerprint does not exist")) {
                const user = await SynapseAPI.viewUser(match.params.userId);
                await storeUser(user._id);
                authDispatch({ type: AUTH_SET_USER, payload: user });
            }
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <MFAValidation
            onClickVerify={mfaAction}
            onClickSendPin={mfaAction}
            loading={loading}
            error={error}
            pinSent={pinSent}
        />
    );
};

export default MFAValidationView;
