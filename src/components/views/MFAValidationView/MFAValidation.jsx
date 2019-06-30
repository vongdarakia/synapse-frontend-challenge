import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Styled = styled.div`
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #btn-join {
        width: 195px;
        margin-top: 12px;
    }
`;

const MFAValidationView = ({
    onClickVerify,
    onClickSendPin,
    loading,
    error,
    phone,
    pinSent
}) => {
    const [mfaPin = "", setMFAPin] = useState();

    if (pinSent) {
        return (
            <Styled>
                <h5>Enter the MFA code sent to {phone}</h5>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        onClickVerify(mfaPin);
                    }}
                >
                    <TextField
                        id="input-mfa-code"
                        label="Code"
                        type="text"
                        margin="dense"
                        variant="outlined"
                        value={mfaPin}
                        onChange={e => setMFAPin(e.target.value)}
                        disabled={loading}
                    />
                    {error && <div>{error}</div>}
                    <Button
                        id="btn-verify"
                        variant="contained"
                        color="primary"
                        disabled={mfaPin.length !== 6 || loading}
                        type="submit"
                    >
                        {loading ? "Verifying..." : "Verify"}
                    </Button>
                </form>
            </Styled>
        );
    }
    return (
        <Styled>
            <h5>Please have your phone ready</h5>
            <Button
                id="btn-send-pin"
                onClick={() => onClickSendPin()}
                variant="contained"
                color="primary"
                disabled={loading}
            >
                {loading ? "Sending pin..." : "Send Pin"}
            </Button>
        </Styled>
    );
};

export default withRouter(MFAValidationView);
