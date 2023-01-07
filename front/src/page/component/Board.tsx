import { useEffect, useState } from 'react'
import { Accordion, Button, Spinner } from 'react-bootstrap';
import Table from 'react-bootstrap/esm/Table';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { ModelArticle } from '../../class/ModelArticle';
import { textState } from '../../store/test';
import { TOGGLE_CONDITION, TYPE_ARTICLE } from '../../type/type';
import AccountAdd from './AccountAdd';

const Board = () => {

  const navigate = useNavigate();

  const [dataList, setDataList] = useState<TYPE_ARTICLE[]>([]);
  
  // const [test, setTest] = useState<number>(0);
  
  // const [text, setText] = useRecoilState(textState);

  // useEffect(() => {
  //   console.log("1");
  // }, [test])

  const [ conditional , setConditional ] = useState<TOGGLE_CONDITION[]>([]);

  function toggleModule(postNo:number, flag:boolean, object:string) {
    
    let copiedFlag = [...conditional];

    if( object === 'content') {

      // 게시글 토글
      if ( flag !== true ) selectPost(postNo);
  
      const temp = copiedFlag[postNo].postFlag;
      copiedFlag[postNo].postFlag = !temp;
  
    } 
    else if ( object === 'reply' ) {

      // 댓글 토글
      if ( flag !== true ) selectReply(postNo);
  
      const temp = copiedFlag[postNo].replyListFlag;
      copiedFlag[postNo].replyListFlag = !temp;
      
    }

    setConditional(copiedFlag);

  }

  // 게시글 상세 조회
  async function selectPost(postNo :number) {

    const url = `http://localhost:3001/api/post/${postNo}`
    const result = await fetch(url);
    const resJson = await result.json();

    let copiedDataList = [...dataList];
    copiedDataList[postNo].board_content = resJson.board_content;
    
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

  const [ reFreshCondition, setReFreshCondition ] = useState<boolean>(true);

  // 게시글 목록 조회
  async function reFresh() {
    if(reFreshCondition) {
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

        if (resJson !== null || resJson !== undefined) {
  
          setDataList(resJson);
          
          setConditional(() => {
            const a :TOGGLE_CONDITION[] = [];
            for ( let i = 0 ; i < resJson.length ; i++ ) {
              a.push( { postFlag : false , replyListFlag : false } );
            } 
            return a;
          })
        }
    }

    setReFreshCondition(!reFreshCondition);
  }

  useEffect(() => {

    
    reFresh()

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
            <div style={{marginBottom : '12px'}} key={index}>
              <Accordion key={index} className='post-container' >
                <Accordion.Item eventKey={String(index)}>
                  {/* 뚝뚝 끊기는 느낌이 남아 있음. */}
                  <Accordion.Header 
                          onClick = {() => { toggleModule(index, conditional[index].postFlag, 'content'); }}
                          style = {{ display : 'flex',
                                     justifyContent: 'space-around',
                                     textAlign : 'center',
                                     minHeight : '65.52px'}}>
                    <div style={{ flex : 1 }}>{item.board_no}</div>
                    <div style={{ flex : 8 }}>{item.board_title}</div>
                    <div style={{ flex : 2 }}>{item.member_id}</div>
                    <div style={{ flex : 2 , fontSize : '14px', letterSpacing : '-0.8px'}}>
                      <div>{item.create_date}</div>
                      <div>{item.update_date}</div>
                    </div>
                  </Accordion.Header>
  
                  <Accordion.Body >
  
                    {/* 게시글 내용 영역 */}
                    <div style={{minHeight:'500px'}} >
                      {item?.board_content}
                    </div>
                    {/* 게시글 내용 영역 끝 */}
  
                    {/* 댓글영역 */}
                    <div style={{marginTop : '20px'}}>
                      <Accordion key={index} className='reply-container' >
                        <Accordion.Item eventKey='0'>
                          <Accordion.Header onClick={() => toggleModule(index, conditional[index].replyListFlag, 'reply')}>
                            댓글
                          </Accordion.Header>
                          <Accordion.Body style={{minHeight:'300px', margin : '12px'}}>
                            {item.reply?.map((reply, index) => {
                              
                              // if(reply.replyUpdateDate === null || reply.replyUpdateDate === undefined){
                                return (
                                  <div key={index} style={{ display : 'flex',
                                                            fontSize : '13px',
                                                            letterSpacing : '-0.5px',
                                                            marginBottom : '7px'}}>
                                    <div style={{flex : 2}}>{reply.replyCreater}</div>
                                    <div style={{flex : 15}}>{reply.replyContent}</div>
                                    <div style={{flex : 3, height : '39px',display : 'flex' , justifyContent: 'space-between',}}>
                                      <div >
                                        <div >{reply.replyCreateDate}</div>
                                        <div style={{height : '50%'}}>
                                          { reply.replyUpdateDate === null || reply.replyUpdateDate === undefined ? '' : reply.replyUpdateDate }
                                        </div>
                                      </div>
                                      <div className='delete-container' style={{display : 'flex', alignItems: 'center'}}>
                                        {true === true ? <Button >삭제</Button> : ''}
                                      </div>
                                    </div>
                                  </div>
                                )
                            })}
                            <div style={{ display : 'flex',
                                          fontSize : '13px',
                                          letterSpacing : '-0.5px',
                                          marginBottom : '7px',
                                          height : '72px'}}>
                              <div style={{flex : 2}}>닉네임 들어가고</div>
                              <textarea style={{flex : 16, 
                                                padding : '5px',
                                                resize: 'none',
                                                maxLines: 3,
                                                }}></textarea>
                              <div style={{ flex : 2,
                                            display : 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-evenly',}}>
                                <Button>등록하기</Button>
                              </div>
                            </div>
                          </Accordion.Body>
                        </Accordion.Item> 
                      </Accordion>
                    </div>
                    {/* 댓글 영역 끝*/}
  
                  </Accordion.Body>
  
                </Accordion.Item>
              </Accordion>
              {/* 게시글 영역 끝*/}
            </div>
      )
    })
  };
  
  return (
    <>
      {/* {text} */}
      <Accordion defaultActiveKey='0'>
        <Accordion.Item eventKey='0'>
          <Accordion.Header onClick={ () => {
            reFresh()
          }}>
            <div>게시글</div>
          </Accordion.Header>
          <Accordion.Body style={{minHeight : '800px'}}>
            <div style={{marginBottom : '20px', display : 'flex', flexDirection : 'row-reverse'}}>
              <Button onClick={ (e) => {
                console.log(e);
                AccountAdd()
              } }>새글 쓰기</Button>
            </div>
            {/* {spinning()} */}
            {articleList()}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default Board;

