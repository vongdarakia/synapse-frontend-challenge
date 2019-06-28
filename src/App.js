import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
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

const App = () => {
    const [{ user }, authDispatch] = useAuth();

    useEffect(() => {
        const session = Auth.getUserSession();

        // SynapseAPI.viewUsers();
        if (session) {
            // SynapseAPI.linkBankAccount(session.client.id);

            storeUser(session._id);
            authDispatch({ type: AUTH_SET_USER, payload: session });
        }
    }, []);

    return (
        <div className="App">
            <Router>
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
