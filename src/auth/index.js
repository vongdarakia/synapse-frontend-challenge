import { getUserFromLocaleStorage } from "../api/fake-user-database";
import { SynapseAPI } from "../api/synapse-api";

export const Auth = {
    login: async (email, password) => {
        try {
            const existingUser = getUserFromLocaleStorage(email, password);

            return SynapseAPI.viewUser(existingUser.userId);
        } catch (error) {
            throw error;
        }
    }
};
