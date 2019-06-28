import { synapseFetch } from "./api-settings";

export default {
    issueOauth: async (userId, refreshToken) => {
        const response = await synapseFetch(`/oauth/${userId}`, {
            method: "POST",
            body: JSON.stringify({
                refresh_token: refreshToken,
                scope: [
                    "USER|PATCH",
                    "USER|GET",
                    "NODES|POST",
                    "NODES|GET",
                    "NODE|GET",
                    "NODE|PATCH",
                    "NODE|DELETE",
                    "TRANS|POST",
                    "TRANS|GET",
                    "TRAN|GET",
                    "TRAN|PATCH",
                    "TRAN|DELETE",
                    "SUBNETS|GET",
                    "SUBNETS|POST",
                    "SUBNET|GET",
                    "SUBNET|PATCH",
                    "STATEMENTS|GET",
                    "STATEMENT|GET"
                ]
            })
        });

        return response.json();
    }
};
