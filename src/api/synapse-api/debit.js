// import { synapseFetch } from "./api-settings";

// export default {
//     createDebitCard: async ({ firstName, lastName, phone, email, password }) => {
//         const nodeId =
//         const response = await synapseFetch(`/users/${userId}/nodes/${nodeId}/subnets`, {
//             method: "POST",
//             body: JSON.stringify({
//                 logins: [{ email, password }],
//                 phone_numbers: [phone],
//                 legal_names: [`${firstName} ${lastName}`]
//             })
//         });

//         const user = await response.json();

//         if (user.error) {
//             if (user.error.en.includes("password")) {
//                 throw new Error("Password isn't strong enough");
//             }
//             throw new Error(user.error.en);
//         }

//         return user;
//     },

//     viewUser: async userId => {
//         const response = await synapseFetch(`/users/${userId}`, {
//             method: "GET"
//         });
//         const user = await response.json();

//         if (user.error) {
//             throw new Error("Unable to find user");
//         }

//         return user;
//     },

//     viewUsers: async () => {
//         const response = await synapseFetch(`/users`, {
//             method: "GET"
//         });
//         const user = await response.json();

//         if (user.error) {
//             throw new Error(user.error.en);
//         }

//         return user;
//     }
// };
