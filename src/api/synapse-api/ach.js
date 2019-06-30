import { synapseFetch } from "./api-settings";
import { SESSION_OAUTH_KEY } from "../../auth/constants";

export default {
    linkBankAccount: async (userId, oauthKey) => {
        const oauth = oauthKey || sessionStorage[SESSION_OAUTH_KEY] || "";
        const response = await synapseFetch(`/users/${userId}/nodes`, {
            method: "POST",
            body: JSON.stringify({
                type: "ACH-US",
                info: {
                    bank_id: "synapse_good",
                    bank_pw: "test1234",
                    bank_name: "fake"
                }
            }),
            headers: {
                "X-SP-USER": `${oauth}|${userId}`
            }
        });

        const { mfa: { access_token } = {}, success } = await response.json();

        if (success) {
            const mfaResponse = await synapseFetch(`/users/${userId}/nodes`, {
                method: "POST",
                body: JSON.stringify({
                    access_token,
                    mfa_answer: "test_answer"
                }),
                headers: {
                    "X-SP-USER": `${oauth}|${userId}`
                }
            });
            const { nodes } = await mfaResponse.json();

            return nodes;
        }

        throw new Error("Failed to link bank");
    }
};
