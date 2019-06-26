import FakeAPI from "../api/fake-api";
import SynapseAPI from "../api/synapse-api";

const SESSION_LOGIN_KEY = "synapse-login";

export const storeUserSession = user => {
    sessionStorage[SESSION_LOGIN_KEY] = JSON.stringify(user);
};

const Auth = {
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
    login: async (email, password) => {
        try {
            const user = FakeAPI.getUser(email, password);
            const synapseUser = await SynapseAPI.viewUser(user.userId);

            storeUserSession(synapseUser);
            return synapseUser;
        } catch (error) {
            throw error;
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

        console.log(user);
        FakeAPI.saveUser(email, password, user._id);

        return user;
    }
};

export default Auth;
