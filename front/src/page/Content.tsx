import React, { useEffect, useState } from 'react'
import Reply from './component/Reply'
import Post from './component/Post'
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { textState } from '../store/test';
import { TYPE_POST, TYPE_REPLY } from '../type/type';
// import { ModelContent } from '../class/ModelArticle';


const Content = () => {
  return (
    <>
      <Post />
      <Reply />
    </> 
  )
};

export default Content;