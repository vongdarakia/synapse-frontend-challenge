import React from "react";
import styled from "styled-components";
import LocalATM from "@material-ui/icons/LocalAtmRounded";

import { MAIN_PADDING } from "../../../styles";

const Styled = styled.div`
    .transaction-by-month {
        width: 100%;
    }

    .transaction-by-month-items {
        width: 100%;

        .transaction-item {
            padding: 0 12px;
            width: 100%;
        }
    }

    .transaction-info {
        display: flex;
        flex-direction: row;

        .transaction-name-section {
            flex: 1;
            display: flex;
            align-items: center;
            text-align: left;

            .name {
                color: #6d6d6d;
                display: flex;
                align-items: center;
                font-size: 12px;
            }

            .icon {
                padding: 12px;
                display: flex;
                align-items: center;
            }
        }

        .transaction-amount {
            text-align: right;
            display: flex;
            align-items: center;
            padding-right: ${MAIN_PADDING}px;
            font-family: monospace;
            font-size: 16px;
        }

        border-bottom: 1px solid #dfdfdf;

        &:first-child {
            border-top: none;
        }
        &:last-child {
            border-bottom: none;
        }
    }

    .transaction-by-month-name {
        padding: ${MAIN_PADDING}px;
        box-sizing: border-box;
        text-align: left;
        color: #6d6d6d;
        font-size: 12px;
        font-weight: 400;
        letter-spacing: 1px;
        text-transform: uppercase;
    }

    .transaction-by-day {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: white;
        width: 100%;
        box-sizing: border-box;

        .transaction-by-day-name {
            padding: ${MAIN_PADDING}px;
            box-sizing: border-box;
            flex: 1;
            text-align: left;
            font-weight: 400;
            font-size: 12px;
            width: 100%;
            color: #6d6d6d;
            border-top: 1px solid #dfdfdf;
            border-bottom: 1px solid #dfdfdf;
        }
    }

    .transactions {
        width: 100%;
        padding-left: 12px;
        box-sizing: border-box;
    }
`;

const TransactionGroup = ({ groupName, transactionsByDay = {} }) => {
    return (
        <Styled>
            <div className="transaction-by-month">
                <div className="transaction-by-month-name">{groupName}</div>
                <div className="transaction-by-month-items">
                    {transactionsByDay.map(
                        ({ groupName: dayGroupName, transactions }) => (
                            <div
                                className="transaction-by-day"
                                key={dayGroupName}
                            >
                                <div className="transaction-by-day-name">
                                    {dayGroupName}
                                </div>
                                <div className="transactions">
                                    {transactions.map(
                                        ({
                                            _id,
                                            to: {
                                                user: {
                                                    legal_names: [toName]
                                                }
                                            },
                                            from: {
                                                user: {
                                                    legal_names: [fromName]
                                                }
                                            },
                                            amount: { amount }
                                        }) => {
                                            return (
                                                <div
                                                    key={_id}
                                                    className="transaction-info"
                                                >
                                                    <div className="transaction-name-section">
                                                        <div className="icon">
                                                            <LocalATM />
                                                        </div>
                                                        <div className="name">{`${toName}`}</div>
                                                    </div>
                                                    <div className="transaction-amount">
                                                        {`$${amount.toFixed(
                                                            2
                                                        )}`}
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </Styled>
    );
};

export default TransactionGroup;
