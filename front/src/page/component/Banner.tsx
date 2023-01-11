import { useState } from 'react'
import { Button } from 'react-bootstrap'
import LoginPage from '../LoginPage';

let loginSession:any = null;


const Banner = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  
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
          }}>로그인</Button>
        )
      }
  }

  return (
    <div style={{ display :'flex', 
                  justifyContent : 'space-between',
                  margin : '12px'}}>
      <div>게시판</div>
      {bannerButton(loginSession)}
      {toggle ? LoginPage() : <></>}
    </div>
  )
}


export default Banner