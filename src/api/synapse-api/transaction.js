import { synapseFetch } from "./api-settings";
import jsonToQuery from "../../utils/json-to-query";

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
            `/users/${userId}/nodes/${nodeId}/dummy-tran?${jsonToQuery({
                amount,
                is_credit: isCredit,
                subnetid,
                type
            })}`,
            {
                method: "GET"
            }
        );

        return response.json();
    },
    viewTransactions: async userId => {
        const response = await synapseFetch(`/users/${userId}/trans`, {
            method: "GET"
        });
        return response.json();
    }
};
