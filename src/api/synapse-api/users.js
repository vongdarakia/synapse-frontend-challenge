import { getUserFromLocaleStorage, storeUser } from "../fake-user-database";
import { synapseApi, synapseApiHeader } from "./api-settings";

export default {
    createUser: async ({ firstName, lastName, phone, email, password }) => {
        const existingUser = getUserFromLocaleStorage(email);

        if (existingUser && existingUser.userId) {
            console.log(existingUser);
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

        storeUser(email, password, user._id);

        return user;
    }
};
