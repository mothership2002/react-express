import { atom } from 'recoil'

export const userNo = atom<number>({
    key : 'userNo',
    default : -1,
});