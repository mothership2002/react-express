import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

const loginSession = null;

const bannerButton = (loginSession:any) => {
  console.log(loginSession !== null);
  if(loginSession !== null || loginSession !== undefined) {
    return (
      <Button>내 정보</Button>
    )
  }
  else {
    return (
      <>
        <Button>로그인</Button>
        <Button>회원가입</Button>
      </>
    )
  }
}

const Banner = () => {
  return (
    <div style={{ display :'flex', 
                  justifyContent : 'space-between',
                  margin : '12px'}}>
      <div>게시판</div>
      {bannerButton(loginSession)}
    </div>
  )
}


export default Banner