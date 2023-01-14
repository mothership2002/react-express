import React from 'react';
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
            
        </div>
      </div>
    );
  }
  
}

export default LoginPage