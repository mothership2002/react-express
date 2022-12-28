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
      userNickName: '호고고',
      regDateTime: '2022.12.26 10:10:10'
    },
    {
      no: 1,
      title: '기모링1',
      userNickName: '호고고1',
      regDateTime: '2022.12.26 10:10:10'
    },
    {
      no: 2,
      title: '기모링2',
      userNickName: '호고고2',
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
                    no : req.params.postId ,
                    title : 'title',
                    content : 'content',
                    regNickname : 'regNickname',
                    regDateTime : 'regDateTime',
                    updateDateTime : 'updateDateTime',
                  },
                ]; // 대충 코드값으로 셀렉때리는 쿼리;

  const replyList = [ 
                      { 
                        replyNo : '0' ,
                        replyContent : 'reply-content',
                        replyCreater : 'nickname',
                        replyCreateDate : 'createDate',
                        replyUpdateDate : 'updateDate',
                      },
                      { 
                        replyNo : '1' ,
                        replyContent : 'reply-content 1',
                        replyCreater : 'nickname 1',
                        replyCreateDate : 'createDate 1',
                        replyUpdateDate : 'updateDate 1',
                      },
                      { 
                        replyNo : '2' ,
                        replyContent : 'reply-content 2',
                        replyCreater : 'nickname 2',
                        replyCreateDate : 'createDate 2',
                        replyUpdateDate : 'updateDate 2',
                      } 
                    ]

    const item =  [ 
                    {
                      'post' : post,
                      'replyList' : replyList
                    } 
                  ]

  resp.json(item);
});

// 게시글 수정
router.post('/api/post/:postId',(req, resp ,next) => {
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
