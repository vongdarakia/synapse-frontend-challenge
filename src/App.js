import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";

import NotFoundView from "./components/views/NotFoundView";
import SignUpView from "./components/views/SignUpView";
import LoginView from "./components/views/LoginView";
import LoggedOutHomeView from "./components/views/LoggedOutHomeView";

import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

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

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <div className="App">
                    <header className="App-header">Header</header>
                    <Switch>
                        <Route exact path="/" component={LoggedOutHomeView} />
                        <Route exact path="/sign-up" component={SignUpView} />
                        <Route exact path="/login" component={LoginView} />
                        <Route component={NotFoundView} />
                    </Switch>
                </div>
            </Router>
        </ThemeProvider>
    );
};

export default App;
