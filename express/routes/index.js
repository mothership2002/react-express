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
  
  const post =  [
                  { 
                    content : 'content 테스트 0호asdflasdfjlasdjflkasdjflkajsdlfjasdlkfjalsdjfalksdjflaksjdflkajsdfklajsldkfjlaksdjfaklsdjfklajsdlfkjaklsdjflkjzlkxcvzlxkcjvzlkcxvjzlxkcvjzlkcxjvzlkxcjvlzkxcjvlkzxcjvklzxcjvlkzxcjvlkzxcmvlzkcxmvlzkcxmvlzkxcmvlkzxcmvlkzmcvlkzxcmvlkzxmcmzxclvkzcxlk',
                  },
                  {
                    content : 'content 테스트 1호',
                  },
                  {
                    content : 'content 테스트 2호',
                  },
                ]

  const postId = req.params.postId;

  resp.json(post[postId]);
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
