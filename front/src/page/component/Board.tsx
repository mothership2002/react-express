import { useEffect, useState } from 'react'
import style from '../../assets/css/board.module.css';
import { Accordion, Button, Pagination, Spinner } from 'react-bootstrap';
import { TYPE_ARTICLE } from '../../type/type';
import { reFresh, selectDetail, selectReply } from '../../module/async';

const Board = () => {

  // 포스트 리스트
  const [dataList, setDataList] = useState<TYPE_ARTICLE[]>([]);

  // 페이지
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(0);
  const [minPage, setMinPage] = useState<number>(0);

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
  
  // 게시글 목록 조회
  async function getSelectPost() {
    if (reFreshCondition) {
      // 조회 가능시점 (로딩 노출)
      setLoading(true);
      const resJson = await reFresh(currentPage);
      if(resJson !== undefined){
        setDataList(resJson.postList);
        setMaxPage(Math.ceil(resJson.postCount[0].count / 10 ));
      }
      setMinPage(1);
    }
    // 동기 로직 후 로딩 해제
    setLoading(false);
    setReFreshCondition(!reFreshCondition);
  }


  function Spinning() {
    return (
      <div className={style.spinnerContainer}>
        <Spinner animation='border' role='status'/>
        <span>Loading...</span>
      </div>
    )
  }

  function PageContainer() {
    
    let items = [];
    if(maxPage - minPage < 5) {
      for(let i = 1 ; i <= maxPage; i++) {
        items.push(
          <Pagination.Item key={i} onClick={() => {
            if(i !== currentPage){
              setCurrentPage(i);
              getSelectPost();
            }
          }} active={i === currentPage}>{i}</Pagination.Item>
        )
      }
    }
    else { 
      for(let i = currentPage ; i <= maxPage ; i++){
        items.push(
          <Pagination.Item key={i} onClick={() => {
            if(i !== currentPage){
              setCurrentPage(i);
              getSelectPost();
            }
          }} active={i === currentPage}>{i}</Pagination.Item>
        )
      }
    }


    return (
      <Pagination className={style.pagenation}>
        <Pagination.First />
        <Pagination.Prev />
        {/* <Pagination.Item>{minPage}</Pagination.Item> */}
        
        {items}
        {/* <Pagination.Ellipsis />  */}
        {/* <Pagination.Item>{maxPage}</Pagination.Item>  */}
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    );
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
          <div className={style.boardBody}>
            {dataList[index].board_content !== undefined ? dataList[index].board_content : Spinning()}
          </div>
          < div style={{ marginTop: '20px' }}>
            <Accordion key={index} >
              <Accordion.Item eventKey='0'>
                <Accordion.Header onClick={async () => {
                  // TODO CHANGE REPLY OPEN STATUS
                  await getSelectReply(dataList[index].board_no);
                  dataList[index].replyOpen = !dataList[index].replyOpen;
                }}>
                  댓글
                </Accordion.Header>
                <Accordion.Body className={style.replyArea}>

                  {dataList[index].reply !== undefined ? Reply(index) : Spinning()}
                  
                  <div className={style.replyInsertArea}>
                    <div style={{ flex: 2 }}>닉네임 들어가고</div>
                    <textarea className={style.replyContentArea}></textarea>
                    <div className={style.replyBtnArea}>
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
            <div key={index} className={style.replyDetailContainer}>
              <div style={{ flex: 2 }}>{reply.replyCreater}</div>
              <div style={{ flex: 15 }}>{reply.replyContent}</div>
              <div className={style.replyDateContainer}>
                <div >
                  <div >{reply.replyCreateDate}</div>
                  <div style={{ height: '50%' }}>
                    {reply.replyUpdateDate === null || reply.replyUpdateDate === undefined ? '' : reply.replyUpdateDate}
                  </div>
                </div>
                <div className={style.replyDeleteBtn} >
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
  const ArticleList = () => {
    if (dataList !== undefined && dataList.length > 0) {
      return dataList.map((item, index) => {
        return (
          /* 게시글 정보 */
          <div className={style.item} key={index}>
            <Accordion key={index} >
              <Accordion.Item eventKey={String(index)}>

                <Accordion.Header
                  // TODO CHANGE CONTENT OPEN STATUS
                  onClick={() => {
                    getSelectDetail(item.board_no);
                    item.contentOpen = !item.contentOpen;
                  }}
                  className={style.contentBtn}>

                  <div style={{ flex: 1 }}>{item.board_no}</div>
                  <div style={{ flex: 8 }}>{item.board_title}</div>
                  <div style={{ flex: 2 }}>{item.member_id}</div>
                  <div style={{ flex: 2, fontSize: '14px', letterSpacing: '-0.8px' }}>
                    <div>{item.create_date}</div>
                    <div>{item.update_date}</div>
                  </div>
                </Accordion.Header>

                <Accordion.Body className={style.boardBody}>
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
        <div className={style.spinnerContainer}>
          게시글이 없습니다.
        </div>
      )
    }
  };

  const ListBody = () => {
    if (!loading) {
      return (
        <>
          <Accordion.Body className={style.boardMain}>
            <div>
              <div className={style.btnArea}>
                <Button onClick={() => {
                  // postAdd()
                }}>새글 쓰기</Button>
              </div>
              {ArticleList()}
            </div>
            <div>
              {dataList !== undefined && dataList.length > 0 ? PageContainer() : <></>}
            </div>
          </Accordion.Body>
        </>
      )
    }
    else {
      return Spinning();
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

