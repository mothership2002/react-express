import { isDisabled } from '@testing-library/user-event/dist/utils';
import { log } from 'console';
import { useEffect, useState } from 'react'
import { Accordion, Button, Spinner, useAccordionButton } from 'react-bootstrap';
import Table from 'react-bootstrap/esm/Table';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { ModelArticle } from '../../class/ModelArticle';
import { textState } from '../../store/test';
import { TYPE_ARTICLE } from '../../type/type';
import AccountAdd from './AccountAdd';
import { reFresh, selectDetail, selectReply } from './module/async';
// import { toggle } from './module/toggle';

const Board = () => {

  const navigate = useNavigate();
  // 포스트 리스트
  const [dataList, setDataList] = useState<TYPE_ARTICLE[]>([]);

  // 페이지
  const [page, setPage] = useState<number>(1);

  const [loading, setLoading] = useState<boolean>(true);

  // 토글용 새로고침
  const [reFreshCondition, setReFreshCondition] = useState<boolean>(true);

  // 게시글 상세 조회
  async function getSelectDetail(postNo: number) {
    setDataList(await selectDetail(postNo, dataList));

  }

  // 댓글 조회
  async function getSelectReply(postNo: number) {
    setDataList(await selectReply(postNo, dataList));
  }


  function spinning() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '500px' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }

  // 게시글 목록 조회
  async function getSelectPost() {
    if (reFreshCondition) {
      // 조회 가능시점 (로딩 노출)
      setLoading(true);
      const resJson = await reFresh(page);
      setDataList(resJson);
      // 동기 로직 후 로딩 해제
    }
    setLoading(false);
    setReFreshCondition(!reFreshCondition);
  }

  // //과도한 조회 방지 ??
  // const disablebutton = (target: Element, dataList: TYPE_ARTICLE[]) => {
  //   const buttonElemental = target;
  //   if (dataList) {
  //     buttonElemental.setAttribute('disabled', 'true');
  //   }
  //   setTimeout(() => {
  //     buttonElemental.removeAttribute('disabled');
  //   }, 1000);
  // }

  useEffect(() => {

    getSelectPost();

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

  {/* 게시글 내용 영역 */ }
  const Article = (index: number) => {
    if (dataList[index].contentOpen) {
      return (
        <>
          <div style={{minHeight : '500px'}}>
            {dataList[index].board_content !== undefined ? dataList[index].board_content : spinning()}
          </div>
          < div style={{ marginTop: '20px' }}>
            <Accordion key={index} className='reply-container' >
              <Accordion.Item eventKey='0'>
                <Accordion.Header onClick={async () => {
                  // TODO CHANGE REPLY OPEN STATUS
                  const result = await selectReply(dataList[index].board_no, dataList);
                  result[index].replyOpen = !dataList[index].replyOpen;
                  setDataList(result);
                }}>
                  댓글
                </Accordion.Header>
                <Accordion.Body style={{ minHeight: '300px', margin: '12px' }}>

                  {dataList[index].reply !== undefined ? Reply(index) : spinning()}

                  <div style={{
                    display: 'flex',
                    fontSize: '13px',
                    letterSpacing: '-0.5px',
                    marginBottom: '7px',
                    height: '72px'
                  }}>
                    <div style={{ flex: 2 }}>닉네임 들어가고</div>
                    <textarea style={{
                      flex: 16,
                      padding: '5px',
                      resize: 'none',
                      maxLines: 3,
                    }}></textarea>
                    <div style={{
                      flex: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                    }}>
                      <Button>등록하기</Button>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div >
        </>
      )
    }
  }

  const Reply = (index: number) => {
    if (dataList[index].replyOpen) {
      return (
        dataList[index].reply?.map((reply, index) => {
          return (
            <div key={index} style={{
              display: 'flex',
              fontSize: '13px',
              letterSpacing: '-0.5px',
              marginBottom: '7px'
            }}>
              <div style={{ flex: 2 }}>{reply.replyCreater}</div>
              <div style={{ flex: 15 }}>{reply.replyContent}</div>
              <div style={{ flex: 3, height: '39px', display: 'flex', justifyContent: 'space-between', }}>
                <div >
                  <div >{reply.replyCreateDate}</div>
                  <div style={{ height: '50%' }}>
                    {reply.replyUpdateDate === null || reply.replyUpdateDate === undefined ? '' : reply.replyUpdateDate}
                  </div>
                </div>
                <div className='delete-container' style={{ display: 'flex', alignItems: 'center' }}>
                  {true === true ? <Button >삭제</Button> : ''}
                </div>
              </div>
            </div>
          )
        })
      )
    }
  }

  // map돌릴때 key 값 설정
  const articleList = () => {
    if (dataList.length > 0) {
      return dataList.map((item, index) => {
        return (
          /* 게시글 정보 */
          <div style={{ marginBottom: '12px' }} key={index}>
            <Accordion key={index} className='post-container' >
              <Accordion.Item eventKey={String(index)}>

                <Accordion.Header
                  // TODO CHANGE CONTENT OPEN STATUS
                  onClick={() => {
                    getSelectDetail(item.board_no);
                    item.contentOpen = !item.contentOpen;
                  }}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    textAlign: 'center',
                    minHeight: '65.52px'
                  }}>
                  <div style={{ flex: 1 }}>{item.board_no}</div>
                  <div style={{ flex: 8 }}>{item.board_title}</div>
                  <div style={{ flex: 2 }}>{item.member_id}</div>
                  <div style={{ flex: 2, fontSize: '14px', letterSpacing: '-0.8px' }}>
                    <div>{item.create_date}</div>
                    <div>{item.update_date}</div>
                  </div>
                </Accordion.Header>

                <Accordion.Body style={{minHeight : '500px'}}>
                  {Article(index)}
                </Accordion.Body>

              </Accordion.Item>
            </Accordion>
            {/* 게시글 영역 끝*/}
          </div>
        )
      })
    }
    else {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '500px' }}>
          게시글이 없습니다.
        </div>
      )
    }
  };

  const ListBody = () => {
    if (!loading) {
      return (
        <Accordion.Body style={{ minHeight: '800px' }}>
          <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'row-reverse' }}>
            <Button onClick={() => {
              // postAdd()
            }}>새글 쓰기</Button>
          </div>
          {articleList()}
        </Accordion.Body>
      )
    }
    else {
      return spinning();
    }
  }

  return (
    <>
      {/* {text} */}
      <Accordion defaultActiveKey='0'>
        <Accordion.Item eventKey='0'>
          <Accordion.Header id='postButton' onClick={(e) => {
            getSelectPost();
          }} >
            <div>게시글</div>
          </Accordion.Header >
          {ListBody()}
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default Board;

