import React from "react";
import styled from "styled-components";
import { MAIN_BACKGROUND_COLOR } from "../../../styles";
import TransactionGroup from "./TransactionGroup";

const Styled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${MAIN_BACKGROUND_COLOR};

    button {
        max-width: 200px;
        width: 100%;
        margin: 8px 0;
    }

    .balance-section {
        display: flex;
        flex-direction: column;
        font-size: 12px;
        text-align: left;
        padding: 12px;
        box-sizing: border-box;
        width: 100%;
        color: #6f6f6f;

        .balance {
            font-family: monospace;
            font-size: 20px;
            color: #2b2b2b;
        }
    }

    .transactions-by-month {
        width: 100%;
    }
`;

const AuthenticatedHome = ({ transactionsByMonth = [], userBalance = 0 }) => {
    return (
        <Styled>
            <div className="balance-section">
                <div>Available Balance</div>
                <div className="balance">{`$${userBalance}`}</div>
            </div>
            <div className="transactions-by-month">
                {transactionsByMonth.map(({ groupName, transactionsByDay }) => {
                    return (
                        <TransactionGroup
                            key={groupName}
                            groupName={groupName}
                            transactionsByDay={transactionsByDay}
                        />
                    );
                })}
            </div>
        </Styled>
    );
};

export default AuthenticatedHome;
