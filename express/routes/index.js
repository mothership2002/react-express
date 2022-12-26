var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  res.json('aaaa');
});

router.get('/index', function(req, res, next) {
  res.render("hello_world", { title : 'test'});
});

router.get('/getTestJson', (req, res, next) => {
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
  
  res.json(result);
  // res.send(result);
});

module.exports = router;
