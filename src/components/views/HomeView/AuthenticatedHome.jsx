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

const AuthenticatedHome = ({ user, transactions }) => {
    const { client } = user;

    return (
        <Styled>
            <div>Welcome {client.name}</div>
            <div>
                <ul>
                    {transactions.map(
                        ({ _id, amount: { amount }, to, from }) => {
                            return (
                                <li key={_id}>
                                    {amount} from {from.user.legal_names[0]} to{" "}
                                    {to.user.legal_names[0]}
                                </li>
                            );
                        }
                    )}
                </ul>
            </div>
        </Styled>
    );
};

export default AuthenticatedHome;
