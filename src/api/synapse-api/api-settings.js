const corsProxy = "https://cors-anywhere.herokuapp.com/";
const synapseHost = "https://uat-api.synapsefi.com/v3.1";

export const synapseApi = `${corsProxy}${synapseHost}`;

export const synapseApiHeader = {
    "X-SP-GATEWAY": `${process.env.REACT_APP_SYNAPSEFI_CLIENT_ID}|${
        process.env.REACT_APP_SYNAPSEFI_CLIENT_SECRET
    }`,
    "X-SP-USER-IP": "127.0.0.1",
    "X-SP-USER": "|e83cf6ddcf778e37bfe3d48fc78a6502062fc",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
};
