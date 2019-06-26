import { synapseApiHost, synapseHeader } from "./api-settings";
import FakeAPI from "../fake-api";

export default {
    createUser: async ({ firstName, lastName, phone, email, password }) => {
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

        FakeAPI.saveUser(email, password, user._id);

        return user;
    },

    viewUser: async userId => {
        const response = await fetch(`${synapseApiHost}/users/${userId}`, {
            method: "GET",
            headers: synapseHeader
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
