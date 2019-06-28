import { synapseFetch } from "./api-settings";

export default {
    linkBankAccount: async userId => {
        const response = await synapseFetch(`/users/${userId}/nodes`, {
            method: "POST",
            body: JSON.stringify({
                type: "ACH-US",
                info: {
                    bank_id: "synapse_good",
                    bank_pw: "test1234",
                    bank_name: "fake"
                }
            })
        });

        const bank = await response.json();

        console.log(bank);
        // if (bank.error) {
        //     if (bank.error.en.includes("password")) {
        //         throw new Error("Password isn't strong enough");
        //     }
        //     throw new Error(bank.error.en);
        // }

        return bank;
    }
};
