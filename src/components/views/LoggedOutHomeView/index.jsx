import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import LoggedOutHome from "./LoggedOutHome";

class LoggedOutHomeView extends Component {
    login = () => {
        this.props.history.push("/login");
    };

    signUp = () => {
        this.props.history.push("/sign-up");
    };

    render() {
        return (
            <LoggedOutHome
                onClickLogin={this.login}
                onClickSignUp={this.signUp}
            />
        );
    }
}

export default withRouter(LoggedOutHomeView);
