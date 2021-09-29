import CryptoJS from 'crypto-js';
const KEY = "jhXfn84nZu96w8Pxl8DN12TQei6zAnpc";

export const encrypt = (data: string) => {
    return CryptoJS.AES.encrypt(data, KEY).toString();
}

export const decrypt = (data: string) => {
    return CryptoJS.AES.decrypt(data, KEY, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);
}
