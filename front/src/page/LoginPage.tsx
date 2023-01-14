import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import styles from '../assets/css/modal.module.css';
import { toggleState } from '../store/toggle';

const LoginPage = () => {

  const [toggle , setToggle] = useRecoilState<boolean>(toggleState);
  
  if(toggle) {
    return (
      <div className={styles.modal} onClick={() => {
        setToggle(!toggle);
      }}>
        <div className={styles.container} onClick={(e)=>{
          e.stopPropagation();
        }}>
          <div className={styles.loginValueBox}>

            <InputGroup size='lg' className={styles.valueBox}>
             <InputGroup.Text id="account" style={{width:'66.61px'}}>ID</InputGroup.Text>
              <Form.Control
              aria-label="id"
              aria-describedby="inputGroup-sizing"
              placeholder='아이디'
              />
            </InputGroup>

            <InputGroup size='lg' className={styles.valueBox}>
             <InputGroup.Text id="password">PW</InputGroup.Text>
              <Form.Control
              aria-label="password"
              aria-describedby="inputGroup-sizing"
              placeholder='비밀번호'
              />
            </InputGroup>

            <Button className={styles.valueBox} variant="outline-dark" onClick={() => {

            }}> 로그인</Button>
            <div className={styles.valueBox}>
              <Button variant="outline-dark" size='sm'>회원가입</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}

export default LoginPage