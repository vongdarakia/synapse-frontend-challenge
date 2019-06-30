import React, { createContext, useReducer, useContext } from "react";
import { AUTH_SET_USER, AUTH_LOG_OUT, SET_USER_BALANCE } from "./actions";
import Auth from "../../../auth";

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

const initialState = {
    user: null,
    userBalance: 0
};

function authReducer(state = initialState, { type, payload }) {
    switch (type) {
        case AUTH_SET_USER: {
            return { ...state, user: payload };
        }
        case AUTH_LOG_OUT: {
            Auth.clearSession();
            return { ...state, user: null };
        }
        case SET_USER_BALANCE: {
            return { ...state, userBalance: payload };
        }
        default: {
            throw new Error(`Unhandled action type: ${type}`);
        }
    }
}

function AuthProvider({ children }) {
    const [state, setAuth] = useReducer(authReducer, { Auth: 0 });

    return (
        <AuthStateContext.Provider value={state}>
            <AuthDispatchContext.Provider value={setAuth}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );
}

function useAuthState() {
    const context = useContext(AuthStateContext);
    if (context === undefined) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }
    return context;
}

function useAuthDispatch() {
    const context = useContext(AuthDispatchContext);
    if (context === undefined) {
        throw new Error("useAuthDispatch must be used within a AuthProvider");
    }
    return context;
}

function useAuth() {
    return [useAuthState(), useAuthDispatch()];
}

export { AuthProvider, useAuthState, useAuthDispatch, useAuth };
