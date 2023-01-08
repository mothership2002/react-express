const { application, json } = require('express');
var express = require('express');
var router = express.Router();

const sql = require('../module/sql');
const conn = require('../module/connection');

/* GET home page. */
router.get('/', function(req, resp, next) {
  resp.render('index', { title: 'Express' });
  resp.json('aaaa');
});

// 테스트
router.get('/index', function(req, resp, next) {
  resp.render("hello_world", { title : 'test'});
});

// 전체조회
router.get('/api/post-all/:page?', async (req, resp, next) => {
  
  const res = await conn.getRowResult(sql.postPage(req.params.page, 10));

  if (res !== null || res !== undefined) {
    resp.json(res);
  }
  else {
    resp.json('err');
  }
});

// 상세조회
router.get('/api/post/:postId', async (req, resp, next) => {
  
  const res = await conn.getRowResult(sql.selectConent(req.params.postId));

  if (res !== null || res !== undefined) {
    resp.json(res);
  }
  else {
    resp.json('err');
  }
});

router.get('/api/reply/:postId', (req, resp, next) => {
  const replyList1 =     [
                          { 
                            createNo : '1',
                            replyNo : '0' ,
                            replyContent : 'reply-content 1',
                            replyCreater : 'nickname',
                            replyCreateDate : '2023.01.02 18:39:20',
                            replyUpdateDate : null,
                          },
                          { 
                            createNo : '1',
                            replyNo : '1' ,
                            replyContent : 'reply-content 1',
                            replyCreater : 'nickname 1',
                            replyCreateDate : '2023.01.02 18:39:20',
                            replyUpdateDate : '2023.01.03 12:39:20',
                          },
                          { 
                            createNo : '1',
                            replyNo : '2' ,
                            replyContent : 'reply-content 2',
                            replyCreater : 'nickname 2',
                            replyCreateDate : '2023.01.02 18:39:20',
                            replyUpdateDate : '2023.01.03 12:39:20',
                          },
                          { 
                            createNo : '1',
                            replyNo : '3' ,
                            replyContent : 'reply-content 2',
                            replyCreater : 'nickname 2',
                            replyCreateDate : '2023.01.02 18:39:20',
                            replyUpdateDate : '2023.01.03 12:39:20',
                          },
                          { 
                            createNo : '2',
                            replyNo : '4' ,
                            replyContent : 'reply-content 2',
                            replyCreater : 'nickname 2',
                            replyCreateDate : '2023.01.02 18:39:20',
                            replyUpdateDate : '2023.01.03 12:39:20',
                          },
                          { 
                            createNo : '2',
                            replyNo : '4' ,
                            replyContent : 'reply-content 2',
                            replyCreater : 'nickname 2',
                            replyCreateDate : '2023.01.02 18:39:20',
                            replyUpdateDate : null,
                          },
                        ]

  const replyList2 =     [
                          { 
                            createNo : '1',
                            replyNo : '0' ,
                            replyContent : '두번째 게시글 테스트',
                            replyCreater : 'nickname',
                            replyCreateDate : '2023.01.03 12:39:20',
                            replyUpdateDate : null,
                          },
                          { 
                            createNo : '1',
                            replyNo : '1' ,
                            replyContent : '두번째 게시글 테스트',
                            replyCreater : 'nickname 1',
                            replyCreateDate : '2023.01.03 12:39:20',
                            replyUpdateDate : null,
                          },
                          { 
                            createNo : '1',
                            replyNo : '2' ,
                            replyContent : '두번째 게시글 테스트',
                            replyCreater : 'nickname 2',
                            replyCreateDate : '2023.01.03 12:39:20',
                            replyUpdateDate : null,
                          },
                          { 
                            createNo : '1',
                            replyNo : '3' ,
                            replyContent : '두번째 게시글 테스트',
                            replyCreater : 'nickname 2',
                            replyCreateDate : '2023.01.03 12:39:20',
                            replyUpdateDate : null,
                          },
                          { 
                            createNo : '2',
                            replyNo : '4' ,
                            replyContent : '두번째 게시글 테스트',
                            replyCreater : 'nickname 2',
                            replyCreateDate : '2023.01.03 12:39:20',
                            replyUpdateDate : null,
                          },
                          { 
                            createNo : '2',
                            replyNo : '4' ,
                            replyContent : '두번째 게시글 테스트',
                            replyCreater : 'nickname 2',
                            replyCreateDate : '2023.01.03 12:39:20',
                            replyUpdateDate : null,
                          },
                        ]
                        
  const replyList3 =     [
                          { 
                            createNo : '1',
                            replyNo : '0' ,
                            replyContent : '세번째 게시글 테스트',
                            replyCreater : 'nickname',
                            replyCreateDate : '2023.01.03 12:39:20',
                            replyUpdateDate : null,
                          },
                          { 
                            createNo : '1',
                            replyNo : '1' ,
                            replyContent : '세번째 게시글 테스트',
                            replyCreater : 'nickname 1',
                            replyCreateDate : '2023.01.03 12:39:20',
                            replyUpdateDate : null,
                          },
                          { 
                            createNo : '1',
                            replyNo : '2' ,
                            replyContent : '세번째 게시글 테스트',
                            replyCreater : 'nickname 2',
                            replyCreateDate : '2023.01.03 12:39:20',
                            replyUpdateDate : null,
                          },
                          { 
                            createNo : '1',
                            replyNo : '3' ,
                            replyContent : '세번째 게시글 테스트',
                            replyCreater : 'nickname 2',
                            replyCreateDate : '2023.01.03 12:39:20',
                            replyUpdateDate : null,
                          },
                          { 
                            createNo : '2',
                            replyNo : '4' ,
                            replyContent : '세번째 게시글 테스트',
                            replyCreater : 'nickname 2',
                            replyCreateDate : '2023.01.03 12:39:20',
                            replyUpdateDate : null,
                          },
                          { 
                            createNo : '2',
                            replyNo : '4' ,
                            replyContent : '세번째 게시글 테스트',
                            replyCreater : 'nickname 2',
                            replyCreateDate : '2023.01.03 12:39:20',
                            replyUpdateDate : null,
                          },
                        ]  
                      

  const param = parseInt(req.params.postId);
  let replyList = null;

  switch(param){
    case 0 : replyList = replyList1;
      break;
    case 1 : replyList = replyList2
      break;
    case 2 : replyList = replyList3
  }

  resp.json(replyList);
});

// 게시글 수정
router.post('/api/post/:postId', (req, resp,next) => {
  const title = req.body.title;
  const regNickname = req.body.regNickname;

  // const updateDate = 
  const reqJson = req.body.json();

});


// 테스트 
router.post('/testPost', (req, resp, next) => {
  
  console.log(req.body);
  // const title = req.body.title;
  // const regNickname = req.body.regNickname;
  // const reqJson = req.body.json();
  resp.json(req.body);

});

module.exports = router;
