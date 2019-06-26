import { Client } from "synapsenode";

export const synapseClient = new Client({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    // fingerprint: process.env.FINGERPRINT,
    // ip_address: "<ip_address>",
    isProduction: false
});
