import { synapseFetch } from "./api-settings";

export default {
    createDummyTransaction: async ({
        userId,
        nodeId,
        amount,
        isCredit = "no",
        subnetid,
        type = "ACH"
    }) => {
        const response = await synapseFetch(
            `/users/${userId}/nodes/${nodeId}/dummy-tran`,
            {
                method: "GET"
                // body: JSON.stringify({
                //     amount,
                //     is_credit: isCredit,
                //     subnetid,
                //     type
                // })
            }
        );

        return response.json();
    }
};
