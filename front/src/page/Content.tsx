import React, { useEffect, useState } from 'react'
import Reply from './component/Reply'
import Post from './component/Post'
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { textState } from '../store/test';


export default function Content() {

  const param = useParams<{no: string}>();

  const [item , setItem] = useState([]);

  const [replyList, setReplyList] = useState([]);

  const [text, setText] = useRecoilState(textState);

  useEffect(() => {

    (async () => { 
      const url = `http://localhost:3001/api/post/${param.no}`;
      const res = await fetch(url);
      const resJson = await res.json();
      console.log(resJson);
      setItem(resJson);
    })();
    

  },[]);


  return (
    <>
      <Post/>
      <Reply/>
    </>
  )
}
