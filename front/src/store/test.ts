import { atom } from "recoil";

export const textStateKey = 'textState';
export const textState = atom({
    key: textStateKey,
    default: '',
});