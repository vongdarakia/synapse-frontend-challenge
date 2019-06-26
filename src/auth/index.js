import FakeAPI from "../api/fake-api";
import SynapseAPI from "../api/synapse-api";

export const Auth = {
    login: async (email, password) => {
        try {
            const user = FakeAPI.getUser(email, password);
            const synapseUser = await SynapseAPI.viewUser(user.userId);

            // if (synapseUser)
        } catch (error) {
            throw error;
        }
    }
};
