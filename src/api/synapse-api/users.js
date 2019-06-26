import {
    getUserFromLocaleStorage,
    storeUser,
    userExists
} from "../fake-user-database";
import { synapseApi, synapseApiHeader } from "./api-settings";

export default {
    createUser: async ({ firstName, lastName, phone, email, password }) => {
        if (userExists(email)) {
            throw new Error("User already exists");
        }

        const response = await fetch(`${synapseApi}/users`, {
            method: "POST",
            headers: synapseApiHeader,
            body: JSON.stringify({
                logins: [{ email, password }],
                phone_numbers: [phone],
                legal_names: [`${firstName} ${lastName}`]
            })
        });

        const user = await response.json();

        if (user.error) {
            if (user.error.en.includes("password")) {
                throw new Error("Password isn't strong enough");
            }
            throw new Error(user.error.en);
        }

        storeUser(email, password, user._id);

        return user;
    },

    viewUser: async userId => {
        const response = await fetch(`${synapseApi}/users/${userId}`, {
            method: "GET",
            headers: synapseApiHeader
        });
        const user = await response.json();

        if (user.error) {
            if (user.error.en.includes("password")) {
                throw new Error("Password isn't strong enough");
            }
            throw new Error(user.error.en);
        }

        return user;
    }
};
