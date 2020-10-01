var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.set('Cache-control', 'public, max-age=300')
  res.render('index', {page:'Home', menuId:'home'});
});

/* GET contact us page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', {page:'Contact', menuId:'contact'});
});

/* GET about us page. */
router.get('/about', function(req, res, next) {
  res.render('about', {page:'About', menuId:'about'});
});


module.exports = router;
