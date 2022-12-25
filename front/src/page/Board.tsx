import React, { Dispatch, useEffect, useState } from 'react'
import { ModelArticle } from '../class/ModelArticle';
import { TYPE_ARTICLE } from '../type/type';

const Board = () => {

  const [dataList, setDataList] = useState<TYPE_ARTICLE[]>([]);

  const [test, setTest] = useState<number>(0)

  useEffect(( ) => {
    console.log("1");
  },[test])

  useEffect(() => {
    setInterval(() => {
      setTest(c => {
        return c + 1;
      });
    },1000);
    
    // const model = new ModelArticle();
    // model.no = 0;
    // model.title = "하이";
    // model.regDateTime

    setDataList([
      {
        no : 0,
        title : '안녕하세요',
        regNickName : '잉기모리',
        regDateTime : '2022.12.24 20:39:14',
      }
    ]);
  
    return () => {
      
    };
  }, []);
  // useEffect는 변화 감지 트리거가 필요

  // map돌릴때 key 값 설정
  const articleList = () => {
    return dataList.map((item, index) => {
      return (
        <div style={{ display : 'flex', flexDirection : 'row' }} key={index}>
          <div style={{ flex : '1' }}>{item.no}</div>
          <div style={{ flex : '3' }}>{item.title}</div>
          <div style={{ flex : '1' }}>{item.regNickName}</div>
          <div style={{ flex : '1' }}>{item.regDateTime}</div>
        </div>
      )
    })
  };

  return (
    <>
      <div style={{ display : 'flex', width : "100%", height : "100%", flexDirection : 'column' }}>  
        <div style={{ display : 'flex', flexDirection : 'row' }}>
          <div style={{ flex : '1' }}>글 번호</div>
          <div style={{ flex : '3' }}>제목</div>
          <div style={{ flex : '1' }}>작성자</div>
          <div style={{ flex : '1' }}>작성일</div>
        </div>
        {articleList()}
      </div>
    </>
  );
};

export default Board;