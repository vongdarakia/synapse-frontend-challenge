import { synapseFetch } from "./api-settings";

export default {
    viewAllUserNodes: async userId => {
        const response = await synapseFetch(`/users/${userId}/nodes`, {
            method: "GET"
        });

        return response.json();
    }
};
