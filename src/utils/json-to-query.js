export default function jsonToQuery(json) {
    const query = Object.keys(json)
        .filter(key => json[key])
        .map(key => `${key}=${json[key]}`)
        .join("&");
    return encodeURI(query);
}
