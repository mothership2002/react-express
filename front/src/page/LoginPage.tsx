import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styles from '../assets/css/modal.module.css';
import { selectAccount } from '../module/async';
import { toggleState } from '../store/toggle';
import { userNo } from '../store/userNo';

const LoginPage = () => {

  const [toggle , setToggle] = useRecoilState<boolean>(toggleState);
  const [userId , setUserId] = useState<string>();
  const [password , setPassword] = useState<string>();
  const [flag , setFlag] = useRecoilState<number>(userNo);

  const checkSum = (value:string | undefined | null, type:string) => {
    if ( value === null || value === undefined || value === '') {
      alert(type + '를 입력해주세요.')
      return false;
    } 
    return true;
  }
  
  if(toggle) {
    return (
      <div className={styles.modal} 
        onMouseDown={(e) => {
          setToggle(!toggle);
        }} 
      >
        <div className={styles.container} 
          onMouseDown={(e)=>{
            e.stopPropagation();
          }}
        >
          <div className={styles.loginValueBox}>

            <InputGroup size='lg' className={styles.valueBox}>
             <InputGroup.Text style={{width:'66.61px'}}>ID</InputGroup.Text>
              <Form.Control
                aria-label="id"
                aria-describedby="inputGroup-sizing"
                placeholder='아이디'
                onChange={(e)=>{setUserId(e.target.value)}}
              />
            </InputGroup>

            <InputGroup size='lg' className={styles.valueBox}>
             <InputGroup.Text>PW</InputGroup.Text>
              <Form.Control
                id='password'
                aria-label="password"
                aria-describedby="inputGroup-sizing"
                placeholder='비밀번호'
                type='password'
                onChange={(e)=>{setPassword(e.target.value)}}
              />
            </InputGroup>

            <Button className={styles.valueBox} variant="outline-dark" onClick={async () => {

              if(!checkSum(userId, '아이디')) {
                return;
              }

              if(!checkSum(password, '패스워드')){
                return;
              }

              if(userId !== undefined && password !== undefined) {
                const resJson = await selectAccount(userId, password)                
                if(resJson.length > 0){
                  setFlag(resJson[0].member_no);
                  setToggle(!toggle);
                }
                else {
                  alert('아이디 또는 비밀번호가 일치하지 않습니다.');
                }
              }
              
            }}> 로그인</Button>
            <div className={styles.valueBox}>
              <Link to={`account-add`}>
                <Button variant="outline-dark" size='sm'>
                    회원가입
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}

export default LoginPage