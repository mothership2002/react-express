var express = require('express');
var router = express.Router();

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
router.get('/api/post-all', (req, resp, next) => {
  const result = [
    {
      no: 0,
      title: '기모링',
      regNickName: '호고고',
      regDateTime: '2022.12.26 10:10:10'
    },
    {
      no: 1,
      title: '기모링1',
      regNickName: '호고고1',
      regDateTime: '2022.12.26 10:10:10'
    },
    {
      no: 2,
      title: '기모링2',
      regNickName: '호고고2',
      regDateTime: '2022.12.26 10:10:10'
    },
  ];
  
  resp.json(result);
  // res.send(result);
});



// 상세조회
router.get('/api/post/:postId',(req, resp, next) => {
  const selectId = req.params.postId;

  const post =  { 
                  no : selectId,
                  title : 'title',
                  content : 'content',
                  regNickname : 'regNickname',
                  regDateTime : 'regDateTime',
                  updateDateTime : 'updateDateTime',
                }

  resp.json(post);
});

router.get('/api/reply/:postId', (req, resp, next) => {
  const replyList =     [
                          { 
                            createNo : '1',
                            replyNo : '0' ,
                            replyContent : 'reply-content',
                            replyCreater : 'nickname',
                            replyCreateDate : 'createDate',
                            replyUpdateDate : 'updateDate',
                          },
                          { 
                            createNo : '1',
                            replyNo : '1' ,
                            replyContent : 'reply-content 1',
                            replyCreater : 'nickname 1',
                            replyCreateDate : 'createDate 1',
                            replyUpdateDate : 'updateDate 1',
                          },
                          { 
                            createNo : '1',
                            replyNo : '2' ,
                            replyContent : 'reply-content 2',
                            replyCreater : 'nickname 2',
                            replyCreateDate : 'createDate 2',
                            replyUpdateDate : 'updateDate 2',
                          },
                          { 
                            createNo : '1',
                            replyNo : '3' ,
                            replyContent : 'reply-content 2',
                            replyCreater : 'nickname 2',
                            replyCreateDate : 'createDate 2',
                            replyUpdateDate : 'updateDate 2',
                          },
                          { 
                            createNo : '2',
                            replyNo : '4' ,
                            replyContent : 'reply-content 2',
                            replyCreater : 'nickname 2',
                            replyCreateDate : 'createDate 2',
                            replyUpdateDate : 'updateDate 2',
                          },
                        ]

                      // { replyList : 
                      //   [ 
                      //     { 
                      //       createNo : '1',
                      //       replyNo : '0' ,
                      //       replyContent : 'reply-content',
                      //       replyCreater : 'nickname',
                      //       replyCreateDate : 'createDate',
                      //       replyUpdateDate : 'updateDate',
                      //     },
                      //     { 
                      //       createNo : '1',
                      //       replyNo : '1' ,
                      //       replyContent : 'reply-content 1',
                      //       replyCreater : 'nickname 1',
                      //       replyCreateDate : 'createDate 1',
                      //       replyUpdateDate : 'updateDate 1',
                      //     },
                      //     { 
                      //       createNo : '1',
                      //       replyNo : '2' ,
                      //       replyContent : 'reply-content 2',
                      //       replyCreater : 'nickname 2',
                      //       replyCreateDate : 'createDate 2',
                      //       replyUpdateDate : 'updateDate 2',
                      //     },
                      //   ]
                      // }

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
