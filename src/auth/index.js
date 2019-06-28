import FakeAPI from "../api/fake-api";
import SynapseAPI from "../api/synapse-api";
import {
    SESSION_LOGIN_KEY,
    SESSION_REFRESH_TOKEN_KEY,
    SESSION_OAUTH_KEY
} from "./constants";

export const storeUserSession = user => {
    sessionStorage[SESSION_LOGIN_KEY] = JSON.stringify(user);
    sessionStorage[SESSION_REFRESH_TOKEN_KEY] = user.refreshToken;
};

export const storeOauth = oauth => {
    sessionStorage[SESSION_OAUTH_KEY] = oauth.oauth_key;
};

export const storeUser = async userId => {
    const synapseUser = await SynapseAPI.viewUser(userId);
    const oauth = await SynapseAPI.issueOauth(
        userId,
        synapseUser.refresh_token
    );

    storeUserSession(synapseUser);
    storeOauth(oauth);
    return synapseUser;
};

const Auth = {
    isAuthenticated: () => {
        if (sessionStorage[SESSION_LOGIN_KEY]) {
            return true;
        }
        return false;
    },
    getUserSession: () => {
        try {
            if (sessionStorage[SESSION_LOGIN_KEY]) {
                return JSON.parse(sessionStorage[SESSION_LOGIN_KEY]);
            }
        } catch (error) {
            delete sessionStorage[SESSION_LOGIN_KEY];
        }
        return null;
    },
    getRefreshToken: () => {
        return sessionStorage[SESSION_REFRESH_TOKEN_KEY];
    },
    login: async (email, password) => {
        try {
            const user = FakeAPI.getUser(email, password);

            return storeUser(user.userId);
        } catch (error) {
            throw error;
        }
    },
    logout: callback => {
        delete sessionStorage[SESSION_LOGIN_KEY];
        if (callback) {
            callback();
        }
    },
    signUp: async ({ firstName, lastName, phone, email, password }) => {
        try {
            FakeAPI.getUser(email, password);
            throw new Error("User already exists");
        } catch (error) {
            if (
                error.message === "Password doesn't match" ||
                error.message === "User already exists"
            ) {
                throw new Error("User already exists");
            }
        }

        const user = await SynapseAPI.createUser({
            firstName,
            lastName,
            phone,
            email,
            password
        });

        FakeAPI.saveUser(email, password, user._id);

        return user;
    }
};

export default Auth;
