import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { checkDuplication } from '../../module/async';

const AccountAdd = () => {

  const [ userId , setUserId ] = useState<string>("");
  const [ userPw , setUserPw ] = useState<string>("");
  const [ userPwCheck , setUserPwCheck ] = useState<string>(""); 

  const [ idDuplicate , setIdDuplicate ] = useState<number>(-1);
  const [ passwordCheck , setPasswordCheck ] = useState<number>(-1);

  const pwRegex = /^[a-zA-Z0-9`~!@#$%^&*()-_=+\\|[\]{};:'",.<>/?]{0,12}$/;

  function validationId(IdLength:number|undefined) {
    if ( idDuplicate == -1) {
      return (
        `영문으로 4글자 이상 12글자 이하 ( 현재 글자수 : ${false ? 0 : IdLength} )`
      )
    }
    if ( idDuplicate == 0 ) {
      return (
        `사용 가능한 아이디`
      )
    }
    if ( idDuplicate == 1 ) {
      return (
        `중복된 아이디`
      )
    }
  }

  function validationPw() {
    if ( userPw.length > 4 ) {
      return;
    }
    
    if ( userPwCheck === userPw ) {
      setPasswordCheck(0);
    }
    else {
      setPasswordCheck(-1);
    }
  }

  return (
    <div>
      <div className='value-container'>
        <div>
          <div>아이디 입력란</div>
          <input type="text" onChange={async (e) => {
            const id = e.target.value;
            const regex = /^[A-Za-z0-9]{4,12}$/;

            if ( regex.test(id) ) {
              const checkSum = await checkDuplication(id);
              setIdDuplicate(checkSum[0].count);
            }
            else {
              setIdDuplicate(-1);
            }
            setUserId(id);

          }} minLength={4} maxLength={12}/>
          <div style={{}}>{validationId(userId.length)}</div>
        </div>
        <div>
          <div>패스워드</div>
          <input type="password" onChange={(e) => {
            const value = e.target.value;
            if ( pwRegex.test(value) ) setUserPw(value);
            console.log(userPw);
            validationPw();
          }}/>
        </div>
        <div>
          <div>패스워드 확인</div>
          <input type="password" onChange={(e) => {
            const value = e.target.value;
            if ( pwRegex.test(value) ) setUserPwCheck(value);
            console.log(userPwCheck);
            validationPw();
          }}/>
        </div>
        <div>4글자 이상 12글자 이하</div>
      </div>
      <Button onClick={(e) => {
        if( idDuplicate != 0 ) {
          alert('ID가 유효하지 않음');
          return;
        }

        if( userPw !== userPwCheck || passwordCheck !== 0 ) {
          alert('비밀번호를 확인해주세요.');
          return;
        }

      }}>회원가입</Button>
    </div>
  )

}

export default AccountAdd