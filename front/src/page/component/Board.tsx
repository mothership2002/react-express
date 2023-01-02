import { useEffect, useState } from 'react'
import { Accordion, Spinner } from 'react-bootstrap';
import Table from 'react-bootstrap/esm/Table';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { ModelArticle } from '../../class/ModelArticle';
import { textState } from '../../store/test';
import { TYPE_ARTICLE } from '../../type/type';

const Board = () => {

  const navigate = useNavigate();

  const [dataList, setDataList] = useState<TYPE_ARTICLE[]>([]);
  
  // const [test, setTest] = useState<number>(0);
  
  // const [text, setText] = useRecoilState(textState);

  // useEffect(() => {
  //   console.log("1");
  // }, [test])

  const [ conditional , setConditional ] = useState<boolean[]>([]);

  function toggleModule(postNo:number, flag:boolean, object:string) {

    if( object === 'content') {

      // 게시글 토글
      if ( flag !== true ) selectPost(postNo);
  
      let copiedFlag = [...conditional];
      copiedFlag[postNo] = !conditional[postNo];
  
      setConditional(copiedFlag);
    } 

  }

  // 게시글 상세 조회
  async function selectPost(postNo :number) {

    const url = `http://localhost:3001/api/post/${postNo}`
    const result = await fetch(url);
    const resJson = await result.json();

    let copiedDataList = [...dataList];
    copiedDataList[postNo].content = resJson.content;
    
    setDataList(copiedDataList);

    // 변화 감지 불가 ( 객체에 매핑이 되어있지 않아서?)
    // setDataList((dataList) => {
    //   dataList[postNo].content = resJson.content;
    //   console.log(dataList[postNo].content);
    //   setDataList(dataList);
    //   return dataList;
    // });
  }

  // 댓글 조회
  async function selectReply(postNo:number) {
    
    const url = `http://localhost:3001/api/reply/${postNo}`;
    const result = await fetch(url);
    const resJson = await result.json();

    let copiedDataList = [...dataList];
    copiedDataList[postNo].reply = resJson;
    console.log(copiedDataList[postNo].reply);
    
    setDataList(copiedDataList);
  }

  //
  function spinning() {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }

  useEffect(() => {

    // 게시글 전체 조회
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
      // resJson.length;
      setConditional((v) => {
        for ( let i = 0 ; i < resJson.length ; i++ ){
          v[i] = false;
        } 
        return v;
      })
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
            /* 게시글 정보 / 미디어 함수? */
            <Accordion key={index} className='post-container' >
              <Accordion.Item eventKey={String(index)} onClick = {() => { toggleModule(index, conditional[index], 'content'); }}>
                {/* 뚝뚝 끊기는 느낌이 남아 있음. */}
                <Accordion.Header 
                        style={{ display : 'flex',
                        justifyContent: 'space-around',
                        textAlign : 'center'}}>
                  <div style={{ flex : 1 }}>{item.no}</div>
                  <div style={{ flex : 8 }}>{item.title}</div>
                  <div style={{ flex : 2 }}>{item.regNickName}</div>
                  <div style={{ flex : 2 }}>{item.regDateTime}</div>
                </Accordion.Header>

                <Accordion.Body >

                  {/* 게시글 내용 영역 */}
                  {item?.content}
                  {/* 게시글 내용 영역 끝 */}

                  {/* 댓글영역 */}
                  <div style={{marginTop : '20px'}}>
                    <Accordion key={index} className='reply-container' >
                      <Accordion.Item eventKey='0'>
                        <Accordion.Header onClick={() => selectReply(index)}>
                          댓글
                        </Accordion.Header>
                        <Accordion.Body>
                          {item.reply?.map((reply, index) => {
                            if(reply.replyUpdateDate === null || reply.replyUpdateDate === undefined){
                              return (
                                <div key={index} style={{ display : 'flex',
                                                          fontSize : '13px',
                                                          letterSpacing : '-0.5px',
                                                          marginBottom : '7px'}}>
                                  <div style={{flex : 3}}>{reply.replyCreater}</div>
                                  <div style={{flex : 14}}>{reply.replyContent}</div>
                                  <div style={{flex : 3 , height : '39px'}}>
                                    <div>{reply.replyCreateDate}</div>
                                    <div style={{height : '50%'}}></div>
                                  </div>
                                </div>
                              )
                            }

                            else {
                              return (
                                <div key={index} style={{ display : 'flex',
                                                          fontSize : '13px',
                                                          letterSpacing : '-0.5px',
                                                          marginBottom : '7px'}}>
                                  <div style={{flex : 3}}>{reply.replyCreater}</div>
                                  <div style={{flex : 14}}>{reply.replyContent}</div>
                                  <div style={{flex : 3 , height : '39px'}}>
                                      <div>{reply.replyUpdateDate}</div>
                                      <div>{reply.replyCreateDate}</div>
                                  </div>
                                </div>
                              )
                            }

                          })}
                        </Accordion.Body>
                      </Accordion.Item> 
                    </Accordion>
                  </div>
                  {/* 댓글 영역 끝*/}

                </Accordion.Body>

              </Accordion.Item>
            </Accordion>
            /* 게시글 영역 끝*/
      )
    })
  };
  
  return (
    <>
      {/* {text} */}
      <Accordion defaultActiveKey='0'>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>
            게시글
          </Accordion.Header>
          <Accordion.Body>
            {/* {spinning()} */}
            {articleList()}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default Board;