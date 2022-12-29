import React, { useEffect, useState } from 'react'
import Reply from './component/Reply'
import Post from './component/Post'
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { textState } from '../store/test';
import { TYPE_POST, TYPE_REPLY } from '../type/type';
// import { ModelContent } from '../class/ModelArticle';


const Content = () => {

  const param = useParams<{no: string}>();

  // const [post , setPost] = useState<TYPE_POST[]>([]);

  // // const [item , setItem] = useState<any>([]); 

  // const [replyList, setReplyList] = useState<TYPE_REPLY[]>([]);

  // useEffect(() => {
    
  //   (async () => { 
  //     const url = `http://localhost:3001/api/post/${param.no}`;
  //     const res = await fetch(url);
  //     const resJson = await res.json();
      
  //     // setPost(resJson.data);
  //     setPost(resJson.post);
  //     console.log(post);
      
  //     // setItem( () => {
  //     //   const newItem = resJson;
  //     //   console.log(newItem);
  //     //   return newItem;
  //     // })
    
      
  //   })();

  // }, []);

  return (
    <>
      <Post />
      <Reply />
    </> 
  )
};

export default Content;