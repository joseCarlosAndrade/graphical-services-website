/*
 * General utils for managing cookies in Typescript.
 */
export function setCookie(name: string, val: string) {
    const date = new Date();
    const value = val;
    date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
    document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}

export function getCookie(name: string) {
    const value = "; " + document.cookie;
    const parts = (value.split("; " + name + "="));

    if (parts.length === 2) {
        const lastPart = parts.pop();
        if (lastPart) {
            return lastPart.split(";").shift();
        }
    }
}

export function deleteCookie(name: string) {
    const date = new Date();
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
    document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
}