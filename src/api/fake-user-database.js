// for the purpose of this front-end challenge, I'm storing the credentials locally

export const SYNAPSE_USER_LOCALE_STORAGE_KEY = "synapse-user-";

export const getUserLocaleStorageKey = email => {
    return `${SYNAPSE_USER_LOCALE_STORAGE_KEY}${email}`;
};

export const getUserFromLocaleStorage = (email, password) => {
    const user = localStorage[getUserLocaleStorageKey(email)];

    if (user) {
        return JSON.parse(user);
    }
};

export const storeUser = (email, password, userId) => {
    localStorage[getUserLocaleStorageKey(email)] = JSON.stringify({
        email,
        password,
        userId
    });
};
