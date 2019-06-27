import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "../../../auth";

export default function NonAuthenticatedOnlyRoute({
    component: Component,
    ...rest
}) {
    console.log("is", Auth.isAuthenticated());
    return (
        <Route
            {...rest}
            render={props =>
                Auth.isAuthenticated() ? (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: props.location }
                        }}
                    />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
}
