// I know this file shouldn't even exist. We don't want to expose the CLIENT_SECRET
import users from "./users";
import ach from "./ach";
import oauth from "./oauth";

const SynapseAPI = {
    ...users,
    ...ach,
    ...oauth
};

export default SynapseAPI;
