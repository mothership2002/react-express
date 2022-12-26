var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/index', function(req, res, next) {
  res.render("hello_world", { title : 'test'});
});

router.get('/getTestJson', (req, resp, next) => {
  const result = {
    
    no: 0,
    title: 'ㅇㅇ',
    regNickname : 'dddd',
    regCreateDate : '2022.12.27',

  }

  resp.status(200).json(result);
});

module.exports = router;
