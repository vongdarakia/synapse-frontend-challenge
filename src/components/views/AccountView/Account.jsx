import React from "react";
import styled from "styled-components";
import AccountCircle from "@material-ui/icons/AccountCircleRounded";
import ChevronRight from "@material-ui/icons/ChevronRightRounded";
import {
    PRIMARY_COLOR,
    MAIN_BACKGROUND_COLOR,
    MAIN_PADDING
} from "../../../styles";

const Styled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${MAIN_BACKGROUND_COLOR};
    height: 100%;

    button {
        max-width: 200px;
        width: 100%;
        margin: 8px 0;
    }

    .account-header {
        display: flex;
        flex-direction: row;
        width: 100%;
        padding: ${MAIN_PADDING}px;
        box-sizing: border-box;

        .account-name {
            font-size: 28px;
            font-weight: bold;
            text-align: left;
            flex: 1;
        }

        .account-photo {
            display: flex;
            align-items: center;

            .MuiSvgIcon-root {
                font-size: 48px;
                color: #6d6d6d;
            }
        }
    }

    .account-tabs {
        display: flex;
        padding: ${MAIN_PADDING}px;
        box-sizing: border-box;
        width: 100%;

        .tab {
            border: 1px solid ${PRIMARY_COLOR};
            background-color: ${MAIN_BACKGROUND_COLOR};
            color: ${PRIMARY_COLOR};
            padding: 4px;
            font-weight: bolder;
            font-size: 12px;
            flex: 1;

            &.active {
                background-color: ${PRIMARY_COLOR};
                color: ${MAIN_BACKGROUND_COLOR};
            }
        }

        #advances-tab {
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
        }

        #account-tab {
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
        }
    }

    .section {
        width: 100%;
    }

    .section-items {
        width: 100%;
    }

    .section-title {
        padding: ${MAIN_PADDING}px;
        box-sizing: border-box;
        text-align: left;
        color: #6d6d6d;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 1px;
    }

    .section-item {
        display: flex;
        align-items: center;
        background-color: white;
        width: 100%;
        padding: ${MAIN_PADDING}px;
        box-sizing: border-box;
        cursor: pointer;

        .section-item-name {
            flex: 1;
            text-align: left;
            font-weight: 500;
            font-size: 16px;
        }
    }
`;

const Account = ({ user = {}, onClickLogout, onClickLinkBankAccount }) => {
    const { client = {} } = user;

    return (
        <Styled>
            <div className="account-header">
                <div className="account-name">{client.name}</div>
                <div className="account-photo">
                    <AccountCircle />
                </div>
            </div>

            <div className="account-tabs">
                <div id="advances-tab" className="tab">
                    ADVANCES
                </div>
                <div id="account-tab" className="tab active">
                    ACCOUNT
                </div>
            </div>

            <div className="section">
                <div className="section-title">INFO</div>
                <div className="section-items">
                    <div className="section-item" onClick={onClickLogout}>
                        <div className="section-item-name">Log out</div>
                        <ChevronRight />
                    </div>
                </div>
            </div>

            <div className="section">
                <div className="section-title">FAKE</div>
                <div className="section-items">
                    <div
                        className="section-item"
                        onClick={onClickLinkBankAccount}
                    >
                        <div className="section-item-name">
                            Link bank account{" "}
                        </div>
                        <ChevronRight />
                    </div>
                </div>
            </div>
        </Styled>
    );
};

export default Account;
