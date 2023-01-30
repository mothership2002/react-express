const { application, json } = require('express');
var express = require('express');
var router = express.Router();

const sql = require('../module/sql');
const conn = require('../module/connection');
const app = require('../app');

/* GET home page. */
router.use(function (req, res, next) {
  console.log('Time:', Date());
  next();
});

// 테스트
router.get('/index', function(req, resp, next) {
  resp.render("hello_world", { title : 'test'});
});

// 전체조회
router.use('/api/post-all/:page?', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
})

router.get('/api/post-all/:page?', async (req, resp, next) => {
  
  const postCount = await conn.getRowResult(sql.selectPostCount());
  const postList = await conn.getRowResult(sql.postPage(req.params.page, 10));

  if (postList !== null || postList !== undefined) {

    const selectPost =  { 
                          postCount,
                          'postList' : postList,
                        }

    resp.json(selectPost);
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

router.post('/api/login', async (req, resp, next) => {
  const res = await conn.getRowResult(sql.userLogin(req.body.userId, req.body.password));

  console.log(res);
  if(res) {
    resp.json(res);
  }
  else {
    resp.json('err');
  }
})

router.get('/api/reply/:postId/:replyPage?', async (req, resp, next) => {
  const res = await conn.getRowResult(sql.selectReply(req.params.postId, req.params.replyPage, 10));
  let replyList = res;

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
