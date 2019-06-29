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
            } else {
                oauth = await SynapseAPI.select2FADevice(
                    user._id,
                    user.refresh_token,
                    user.phone_numbers[0]
                );
            }

            if (oauth.oauth_key) {
                await storeUser(user._id, oauth);
                authDispatch({ type: AUTH_SET_USER, payload: user });
            } else {
                setPinSent(true);
                setLoading(false);
                setError(oauth.error.en);
            }
        } catch (error) {
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
