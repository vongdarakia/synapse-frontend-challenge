// for the purpose of this front-end challenge, I'm storing the credentials locally

const SYNAPSE_USER_LOCALE_STORAGE_KEY = "synapse-user-";

const getUserLocaleStorageKey = email => {
    return `${SYNAPSE_USER_LOCALE_STORAGE_KEY}${email}`;
};

export default {
    getUser: (email, password) => {
        const data = localStorage[getUserLocaleStorageKey(email)];

        if (data) {
            const user = JSON.parse(data);

            if (user.password === password) {
                return user;
            }
            throw new Error("Password doesn't match");
        }
        throw new Error("User doesn't exist");
    },
    saveUser: (email, password, userId) => {
        localStorage[getUserLocaleStorageKey(email)] = JSON.stringify({
            email,
            password,
            userId
        });
    }
};
