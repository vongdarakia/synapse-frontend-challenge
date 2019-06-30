import React, { useEffect, useState } from "react";
import { Route, Router, Switch } from "react-router-dom";
import styled from "styled-components";
import "./App.css";

import NotFoundView from "./components/views/NotFoundView";
import SignUpView from "./components/views/SignUpView";
import LoginView from "./components/views/LoginView";
import HomeView from "./components/views/HomeView";

import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Auth, { storeUser } from "./auth";
import PrivateRoute from "./components/common/PrivateRoute";
import NonAuthenticatedOnlyRoute from "./components/common/NonAuthenticatedOnlyRoute";
import TabNavigation from "./components/common/TabNavigation";
import { AuthProvider, useAuth } from "./components/common/AuthContext";
import {
    AUTH_LOG_OUT,
    AUTH_SET_USER
} from "./components/common/AuthContext/actions";
import SynapseAPI from "./api/synapse-api";
import MFAValidationView from "./components/views/MFAValidationView";
import history from "./history";
import AccountView from "./components/views/AccountView";
import { PRIMARY_COLOR } from "./styles";

const Styled = styled.div`
    #bottom-nav {
        position: fixed;
        bottom: 0;
    }

    height: 100vh;
    box-sizing: border-box;
    padding-bottom: 56px;
`;

const App = () => {
    const [{ user }, authDispatch] = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const session = Auth.getUserSession();
        const loadUser = async () => {
            const oauth = await SynapseAPI.issueOauth(
                session._id,
                session.refresh_token
            );

            if (oauth.error && !oauth.error.en.includes()) {
                Auth.clearSession();
                history.push(`/mfa-validation/${session._id}/`);
            } else {
                await storeUser(session._id, oauth);
                authDispatch({ type: AUTH_SET_USER, payload: session });
            }
            setLoading(false);

            // console.log(session);
            // await SynapseAPI.select2FADevice(
            //     session._id,
            //     session.refresh_token,
            //     session.phone_numbers[0]
            // );
            // console.log(
            //     await SynapseAPI.registerFingerprint(
            //         session._id,
            //         session.refresh_token
            //     )
            // );
            // const accounts = await SynapseAPI.linkBankAccount(session._id);
            // // console.log(user);
        };

        // SynapseAPI.viewUsers();
        if (session) {
            loadUser();
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return null;
    }
    return (
        <Styled className="App">
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={HomeView} />
                    <NonAuthenticatedOnlyRoute
                        exact
                        path="/sign-up"
                        component={SignUpView}
                    />
                    <NonAuthenticatedOnlyRoute
                        exact
                        path="/login"
                        component={LoginView}
                    />
                    <NonAuthenticatedOnlyRoute
                        path="/mfa-validation/:userId/:isSigningUp"
                        component={MFAValidationView}
                    />
                    <NonAuthenticatedOnlyRoute
                        path="/mfa-validation/:userId"
                        component={MFAValidationView}
                    />
                    <PrivateRoute path="/advances" component={NotFoundView} />
                    <PrivateRoute path="/banking" component={NotFoundView} />
                    <PrivateRoute path="/account" component={AccountView} />
                    <Route component={NotFoundView} />
                </Switch>

                {user ? <TabNavigation /> : null}
                {/* {user ? (
                    <button
                        onClick={e => {
                            authDispatch({ type: AUTH_LOG_OUT });
                        }}
                    >
                        Log out
                    </button>
                ) : null}

                <button
                    onClick={async () => {
                        const session = Auth.getUserSession();
                        const accounts = await SynapseAPI.linkBankAccount(
                            session._id
                        );
                        console.log(accounts);
                        console.log(
                            await SynapseAPI.createDummyTransaction({
                                userId: session._id,
                                nodeId: accounts[0]._id,
                                amount: 5
                            })
                        );
                        console.log(
                            await SynapseAPI.viewTransactions(session._id)
                        );
                    }}
                >
                    Link banking
                </button> */}
            </Router>
        </Styled>
    );
};

const theme = createMuiTheme({
    palette: {
        primary: {
            main: PRIMARY_COLOR
        }
    },
    status: {
        danger: "orange"
    }
});

export default () => (
    <ThemeProvider theme={theme}>
        <AuthProvider>
            <App />
        </AuthProvider>
    </ThemeProvider>
);
