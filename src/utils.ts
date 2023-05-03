export type TCookieKey = string;

const utils = {
    setCookie: (key: TCookieKey, data: string) => {
        localStorage.setItem(key, data);
    },
    getCookie: (key: TCookieKey) => localStorage.getItem(key),
};

export default utils;
