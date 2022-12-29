import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/esm/Table';
import { useParams } from 'react-router-dom';
import { TYPE_REPLY } from '../../type/type';
import { Button } from 'react-bootstrap';

export default function Reply() {
  
  const param = useParams<{no: string}>();

  const [ replyList , setReplyList ] = useState<TYPE_REPLY[]>([]);

  useEffect(() => {
    
    (async () => {
      const url = `http://localhost:3001/api/reply/${param.no}`
      const result = await fetch(url);
      const resJson = await result.json();
      
      setReplyList(resJson);
      
    })()
  }, []);


  const reply = () => {
    return replyList.map((item, index) => {
      // if(item.createNo === )
      return (
        <tr key={index} >
          <td>{index + 1}</td>
          <td>{item.replyContent}</td>
          <td>{item.replyCreater}</td>
          <td>{item.replyCreateDate}</td>
          <td>{item.replyUpdateDate}</td>
          <Button>수정하기</Button>
          <Button>삭제하기</Button>
          {/* 
            <td>{item.createNo}</td>
            <td>{item.replyNo}</td> 
          */}
        </tr>
      )
    })
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>댓글 번호</th>
          <th>댓글 내용</th>
          <th>작성자</th>
          <th>생성일</th>
          <th>수정일</th>
        </tr>
      </thead>
      <tbody>
        {reply()}
      </tbody>
    </Table>
  );
};
