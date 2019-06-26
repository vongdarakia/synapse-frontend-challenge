import { synapseApiHost, synapseHeader } from "./api-settings";

export default {
    createUser: async ({ firstName, lastName, phone, email, password }) => {
        const response = await fetch(`${synapseApiHost}/users`, {
            method: "POST",
            headers: synapseHeader,
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

        return user;
    },

    viewUser: async userId => {
        const response = await fetch(`${synapseApiHost}/users/${userId}`, {
            method: "GET",
            headers: synapseHeader
        });
        const user = await response.json();

        if (user.error) {
            throw new Error("Unable to find user");
        }

        return user;
    },

    viewUsers: async () => {
        const response = await fetch(`${synapseApiHost}/users`, {
            method: "GET",
            headers: synapseHeader
        });
        const user = await response.json();

        if (user.error) {
            throw new Error(user.error.en);
        }

        return user;
    }
};
