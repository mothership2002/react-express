import React, { Dispatch, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/esm/Table';
import { ModelArticle } from '../class/ModelArticle';
import { TYPE_ARTICLE } from '../type/type';

const Board = () => {

  const [dataList, setDataList] = useState<TYPE_ARTICLE[]>([]);

  const [test, setTest] = useState<number>(0)

  useEffect(() => {
    console.log("1");
  }, [test])

  useEffect(() => {
    setInterval(() => {
      setTest(c => {
        return c + 1;
      });
    }, 1000);

    // const model = new ModelArticle();
    // model.no = 0;
    // model.title = "하이";
    // model.regDateTime

    setDataList([
      {
        no: 0,
        title: '안녕하세요',
        regNickName: '잉기모리',
        regDateTime: '2022.12.24 20:39:14',
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
        <div style={{ display: 'flex', flexDirection: 'row' }} key={index}>
          <div style={{ flex: '1' }}>{item.no}</div>
          <div style={{ flex: '3' }}>{item.title}</div>
          <div style={{ flex: '1' }}>{item.regNickName}</div>
          <div style={{ flex: '1' }}>{item.regDateTime}</div>
        </div>
      )
    })
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default Board;