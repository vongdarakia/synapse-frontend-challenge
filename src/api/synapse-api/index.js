// I know this file shouldn't even exist. We don't want to expose the CLIENT_SECRET
// This should be in the backend
import users from "./users";
import ach from "./ach";
import oauth from "./oauth";
import transaction from "./transaction";
import fingerprints from "./fingerprints";
import nodes from "./nodes";

const SynapseAPI = {
    ...users,
    ...ach,
    ...oauth,
    ...transaction,
    ...fingerprints,
    ...nodes
};

export default SynapseAPI;
