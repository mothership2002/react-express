import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { checkDuplication, insertAccount } from '../../module/async';

const AccountAdd = () => {

  const movePage = useNavigate();

  const [ userId , setUserId ] = useState<string>("");
  const [ userPw , setUserPw ] = useState<string>("");
  const [ userPwCheck , setUserPwCheck ] = useState<string>(""); 

  const [ idDuplicate , setIdDuplicate ] = useState<number>(-1);
  const [ passwordCheck , setPasswordCheck ] = useState<boolean>(false);

  const idRegex = /^[A-Za-z0-9]{4,12}$/;
  const pwRegex = /^[a-zA-Z0-9`~!@#$%^&*()-_=+\\|[\]{};:'",.<>/?]{0,12}$/;

  function validationId(IdLength:number|undefined) {
    if ( idDuplicate === -1) return `영문으로 4글자 이상 12글자 이하 ( 현재 글자수 : ${false ? 0 : IdLength} )`;
    if ( idDuplicate === 0 ) return `사용 가능한 아이디`;
    if ( idDuplicate === 1 ) return `중복된 아이디`;
  }

  function validationPw( value:string ) {
    if( userPw === userPwCheck ) {
      setPasswordCheck(true);
    }
    else {
      setPasswordCheck(false);
    }
  }

  return (
    <div>
      <div className='value-container'>
        <div>
          <div>아이디 입력란</div>
          <input type="text" onChange={async (e) => {
            const id = e.target.value;
            
            if ( idRegex.test(id) ) {
              const checkSum = await checkDuplication( id );
              setIdDuplicate( Number.parseInt( checkSum[0].count ) );
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
            setUserPw( e.target.value );
          }}/>
        </div>
        <div>
          <div>패스워드 확인</div>
          <input type="password" onChange={(e) => {
            setUserPwCheck( e.target.value );
          }}/>
        </div>
      </div>
      <Button onClick={ async (e) => {
        if( idDuplicate !== 0 ) {
          alert('계정값이 옳바르지 않음.');
          return;
        }

        if ( !( pwRegex.test( userPw ) && pwRegex.test( userPwCheck ) ) ) {
          alert('패스워드 확인 바람');
          return;
        }

        if ( userPw !== userPwCheck ) { 
          alert('패스워드가 일치하지 않음.');
          return;
        }
        else {
          const flag = await insertAccount(userId, userPw);
          if ( flag !== undefined || flag !== null ) {
            alert('회원가입 완료');
            movePage('/');
          }
          else {
            alert('회원가입 실패.');
          }
        }
      }}>회원가입</Button>
    </div>
  )

}

export default AccountAdd