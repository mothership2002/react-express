import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { TYPE_POST } from '../../type/type';


export default function Post() {
  const param = useParams<{no: string}>();

  const [post , setPost] = useState<TYPE_POST>();

  // const [text, setText] = useRecoilState(textState);

  useEffect(() => {

    // console.log(param);

    // fetch("/post/" + param).then((resp) => {
    //   resp.json().then((res) => {
    //     setItem(res);
    //   });
    // }); 

    // const promise = new Promise((resolve, reject) => {
    //   // 시간이 걸리는 로직
    //   setTimeout(() => {
    //     try {
    //       resolve('result');
    //     } catch (error) {
    //       resolve('');
    //     }
    //   }, 2000);
    // });

    // promise.then(res => { 
    //   console.log('promise test');
    // });

    (async () => {
      const url = `http://localhost:3001/api/post/${param.no}`
      const result = await fetch(url);
      const resJson = await result.json();
      
      setPost(resJson);
      
    })()

    // fetch(`http://localhost:3001/api/post/${param.no}`).then(res => {
    //   res.json().then((result) => {
    //     setPost(result);
    //     console.log(result);
        
    //     console.log(post);
    //   });
    // });

    return () => {
      // on destroy
      
    };
  }, []);

  return (
    <>
      {/* {text} */}
      {/* <Button onClick={() => {
        setText('changed in post');
      }}>change text value</Button> */}
      <div id='no'>{post?.no}</div>
      <div id='title'>{post?.title}</div>
      <div id="content">{post?.content}</div>
      <div id="regNickName">{post?.regNickName}</div>
      <div id="regDateTime">{post?.regDateTime}</div>
      <div id="updateDateTime">{post?.updateDateTime}</div>

    </>
  );
};