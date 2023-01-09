import {Cookies} from 'react-cookie';

const cookies = new Cookies();

export const session = (id:string) => {
  return cookies.get(id)
}