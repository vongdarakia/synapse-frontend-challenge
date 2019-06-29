import { synapseFetch } from "./api-settings";

export default {
    registerFingerprint: async (userId, refreshToken) => {
        const response = await synapseFetch(`/oauth/${userId}`, {
            method: "POST",
            body: JSON.stringify({
                refresh_token: refreshToken
            }),
            headers: {
                "X-SP-USER": `|${userId}`
            }
        });

        return response.json();
    },
    select2FADevice: async (userId, refreshToken, phone) => {
        const response = await synapseFetch(`/oauth/${userId}`, {
            method: "POST",
            body: JSON.stringify({
                refresh_token: refreshToken,
                phone_number: phone
            }),
            headers: {
                "X-SP-USER": `|${userId}`
            }
        });

        return response.json();
    },
    validate2FAPin: async (userId, refreshToken, pin) => {
        const response = await synapseFetch(`/oauth/${userId}`, {
            method: "POST",
            body: JSON.stringify({
                refresh_token: refreshToken,
                validation_pin: pin
            }),
            headers: {
                "X-SP-USER": `|${userId}`
            }
        });

        return response.json();
    }
};
