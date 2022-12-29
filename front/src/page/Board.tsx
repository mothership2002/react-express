import { useEffect, useState } from 'react'
import Table from 'react-bootstrap/esm/Table';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { ModelArticle } from '../class/ModelArticle';
import { textState } from '../store/test';
import { TYPE_ARTICLE } from '../type/type';

const Board = () => {

  const navigate = useNavigate();

  const [dataList, setDataList] = useState<TYPE_ARTICLE[]>([]);

  const [test, setTest] = useState<number>(0);
  
  // const [text, setText] = useRecoilState(textState);

  // useEffect(() => {
  //   console.log("1");
  // }, [test])

  useEffect(() => {
    
    (async () => {
      const res = await fetch('http://localhost:3001/api/post-all').catch(e => {
      console.log('error catch');
      alert('데이터 조회에 실패 했습니다.');
      return {
          json: () => {
            return undefined;
          }
        };
      });
      const resJson = await res.json();
      if (resJson) {
        setDataList(resJson);
      }
    }) ();

    // fetch('https://example.com/profile', {
    // method: 'POST', // or 'PUT'
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    // body: JSON.stringify(data),
    // })
    // .then((response) => response.json())
    // .then((data) => {
    //   console.log('Success:', data);
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });

    // setInterval(() => {
    //   setTest(c => {
    //     return c + 1;
    //   });
    // }, 1000);

    // const model = new ModelArticle();
    // model.no = 0;
    // model.title = "하이";
    // model.regDateTime

    return () => {

    };
  }, []);
  // useEffect는 변화 감지 트리거가 필요

  // map돌릴때 key 값 설정
  const articleList = () => {
    return dataList.map((item, index) => {
      return (
        <tr key={index} onClick={() => {
          // setText('set in board');      
          navigate(`/post/${item.no}`);
        }}>
          <td>{item.no}</td>
          <td>{item.title}</td>
          <td>{item.regNickName}</td>
          <td>{item.regDateTime}</td>
        </tr>
      )
    })
  };
  
  return (
    <>
      {/* {text} */}
      <Table>
        <thead>
          <tr>
            <th>글 번호</th>
            <th>글 제목</th>
            <th>작성자</th>
            <th>생성일</th>
          </tr>
        </thead>
        <tbody>
          {articleList()}
        </tbody>
      </Table>
    </>
  );
};

export default Board;