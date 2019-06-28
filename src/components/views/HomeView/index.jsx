import React from "react";
import UnauthenticatedHomeView from "./UnauthenticatedHomeView";
import { useAuthState } from "../../common/AuthContext";
import AuthenticatedHomeView from "./AuthenticatedHomeView";

const HomeView = () => {
    const { user } = useAuthState();

    if (user) {
        return <AuthenticatedHomeView />;
    }

    return <UnauthenticatedHomeView />;
};

export default HomeView;
