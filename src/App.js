import React, { useEffect, useState } from "react";
import { Route, Router, Switch } from "react-router-dom";
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

            if (oauth.error) {
                Auth.clearSession();
                history.push("/mfa-validation/" + session._id);
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
            // console.log(
            //     await SynapseAPI.createDummyTransaction({
            //         userId: session._id,
            //         nodeId: accounts[0]._id,
            //         amount: 5
            //     })
            // );
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
        <div className="App">
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
                        exact
                        path="/mfa-validation/:userId"
                        component={MFAValidationView}
                    />
                    <PrivateRoute path="/advances" component={NotFoundView} />
                    <PrivateRoute path="/banking" component={NotFoundView} />
                    <PrivateRoute path="/account" component={NotFoundView} />
                    <Route component={NotFoundView} />
                </Switch>

                {user ? <TabNavigation /> : null}
                {user ? (
                    <button
                        onClick={e => {
                            authDispatch({ type: AUTH_LOG_OUT });
                        }}
                    >
                        Log out
                    </button>
                ) : null}
            </Router>
        </div>
    );
};

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#0C9A41"
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
