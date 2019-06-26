import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

const Styled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
        max-width: 200px;
        width: 100%;
        margin: 8px 0;
    }
`;

const LoggedOutHome = ({ onClickSignUp, onClickLogin }) => {
    return (
        <Styled>
            <Button
                id="btn-sign-up"
                onClick={onClickSignUp}
                variant="contained"
                color="primary"
            >
                Sign up for Dave
            </Button>
            <Button id="btn-login" onClick={onClickLogin} color="primary">
                Log In
            </Button>
        </Styled>
    );
};

export default LoggedOutHome;
