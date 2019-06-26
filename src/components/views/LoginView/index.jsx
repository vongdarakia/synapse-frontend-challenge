import React from "react";
import { withRouter } from "react-router-dom";
import Login from "./Login";

const LoginView = ({ history }) => {
    const onClickSubmit = async ({ email, password }) => {
        const query = `
            query {
                login(email: "${email}", password: "${password}") {
                    user {
                        firstName
                        lastName
                        email
                    }
                    token
                }
            }
        `;

        const response = await fetch("/.netlify/functions/graphql", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query })
        });
        const {
            errors,
            data: { login }
        } = await response.json();

        if (errors) {
            console.error(errors);
        } else {
            const { user, token } = login;
            localStorage["RECEIPT_LOGGER_JWT_TOKEN"] = token;
            // history.push('/');
        }
    };

    return <Login onClickSubmit={onClickSubmit} />;
};

export default withRouter(LoginView);
