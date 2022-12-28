import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useRecoilState } from 'recoil';
import { textState } from '../../store/test';


export default function Post() {
  // const param = useParams<{no: string}>();

  // const [item , setItem] = useState([]);

  const [text, setText] = useRecoilState(textState);

  useEffect(() => {
    // console.log(param);

    // fetch("/post/" + param).then((resp) => {
    //   resp.json().then((res) => {
    //     setItem(res);
    //   });
    // }); 

    const promise = new Promise((resolve, reject) => {
      // 시간이 걸리는 로직
      setTimeout(() => {
        try {
          resolve('result');
        } catch (error) {
          resolve('');
        }
      }, 2000);
    });

    promise.then(res => { 
      console.log('promise test');
    });

    return () => {
      // on destroy
      
    };
  }, []);

  return (
    <>
      {text}
      <Button onClick={() => {
        setText('changed in post');
      }}>change text value</Button>
      <div id='title'></div>
      <div id="content"></div>
      <div id="regNickName"></div>
      <div id="createDate"></div>
      <div id="updateDate"></div>
    </>
  )
};