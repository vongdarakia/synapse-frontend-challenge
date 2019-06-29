import FakeAPI from "../api/fake-api";
import SynapseAPI from "../api/synapse-api";
import {
    SESSION_LOGIN_KEY,
    SESSION_REFRESH_TOKEN_KEY,
    SESSION_OAUTH_KEY,
    SESSION_USER_ID_KEY
} from "./constants";

export const storeUserSession = user => {
    sessionStorage[SESSION_LOGIN_KEY] = JSON.stringify(user);
    sessionStorage[SESSION_REFRESH_TOKEN_KEY] = user.refresh_token;
    sessionStorage[SESSION_USER_ID_KEY] = user._id;
};

export const storeOauth = oauth => {
    sessionStorage[SESSION_OAUTH_KEY] = oauth.oauth_key;
};

export const storeUser = async (userId, oauth) => {
    const synapseUser = await SynapseAPI.viewUser(userId);

    if (!oauth) {
        storeOauth(
            await SynapseAPI.issueOauth(userId, synapseUser.refresh_token)
        );
    } else {
        storeOauth(oauth);
    }

    storeUserSession(synapseUser);

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
    clearSession: callback => {
        delete sessionStorage[SESSION_LOGIN_KEY];
        delete sessionStorage[SESSION_REFRESH_TOKEN_KEY];
        delete sessionStorage[SESSION_USER_ID_KEY];
        delete sessionStorage[SESSION_OAUTH_KEY];
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

        // const mfaResponse = await SynapseAPI.select2FADevice(
        //     user._id,
        //     user.refresh_token,
        //     phone
        // );
        // console.log({ mfaResponse });

        // const fingerprint = await SynapseAPI.registerFingerprint(
        //     user._id,
        //     user.refresh_token
        // );

        // console.log({ fingerprint });

        // To have dummy data to show
        // const accounts = await SynapseAPI.linkBankAccount(user._id);

        // console.log(
        //     await SynapseAPI.createDummyTransaction({
        //         userId: user._id,
        //         nodeId: accounts[0]._id,
        //         amount: 5
        //     })
        // );
        // accounts[0]._id
        FakeAPI.saveUser(email, password, user._id);
        // await storeUser(user._id);
        return user;
    }
};

export default Auth;
