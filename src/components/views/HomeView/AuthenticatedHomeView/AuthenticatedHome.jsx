import React from "react";
import styled from "styled-components";

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

const AuthenticatedHome = ({ user }) => {
    const { client } = user;

    return (
        <Styled>
            <div>Welcome {client.name}</div>
        </Styled>
    );
};

export default AuthenticatedHome;
