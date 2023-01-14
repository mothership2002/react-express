import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useRecoilState } from 'recoil';
import { toggleState } from '../../store/toggle';
import LoginPage from '../LoginPage';

let loginSession:any = null;

const Banner = () => {
  
  const [toggle , setToggle] = useRecoilState<boolean>(toggleState)

  const bannerButton = (loginSession:any) => {
    if(loginSession !== null) {
      return (
        <Button>내 정보</Button>
        )
      }
      else {
        return (
          <Button onClick={ () => {
            setToggle(!toggle);
          }} variant="outline-dark">로그인</Button>
        )
      }
  }

  return (
    <div style={{ display :'flex', 
                  justifyContent : 'space-between',
                  margin : '12px'}}>
      <div>게시판</div>
      {bannerButton(loginSession)}
      {LoginPage()}
    </div>
  )
}


export default Banner