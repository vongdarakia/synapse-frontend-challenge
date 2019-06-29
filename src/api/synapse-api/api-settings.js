import { SESSION_OAUTH_KEY, SESSION_USER_ID_KEY } from "../../auth/constants";

const corsProxy = "https://cors-anywhere.herokuapp.com/";
const synapseHost = "https://uat-api.synapsefi.com/v3.1";

export const synapseApiHost = `${corsProxy}${synapseHost}`;

export const getSynapseHeaders = () => {
    return {
        "X-SP-GATEWAY": `${process.env.REACT_APP_SYNAPSEFI_CLIENT_ID}|${
            process.env.REACT_APP_SYNAPSEFI_CLIENT_SECRET
        }`,
        "X-SP-USER-IP": "127.0.0.1",
        "X-SP-USER": `${sessionStorage[SESSION_OAUTH_KEY] ||
            ""}|${sessionStorage[SESSION_USER_ID_KEY] || ""}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    };
};

export const synapseFetch = async (path, options) => {
    return fetch(`${synapseApiHost}${path}`, {
        ...options,
        headers: {
            ...getSynapseHeaders(),
            ...options.headers
        }
    });
};
