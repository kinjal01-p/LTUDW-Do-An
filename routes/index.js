var express = require('express');
var productRepo = require('../database/repos/productRepo.js');
var config = require('../config/config.js');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  Promise.all([productRepo.top_new(), productRepo.top_sale(), productRepo.top_viewed(), productRepo.getSamples()]).then(values => {

    res.render('index', {
      title: 'Book store',
      top_new: values[0],
      top_sale: values[1],
      top_viewed: values[2],
      products: values[3]
    });
  });
});

/* ADD AN-MT: add normal search and advanded search */
router.get('/search/normal', function (req, res) {
  let words = req.query.q,
    url = req.url,
    page = req.query.page;

  if (url.lastIndexOf('&page') != -1)
    url = url.substr(0, url.lastIndexOf('&page'));

  if (!page) page = 1;

  let offset = (page - 1);

  let pageList = [];

  Promise.all([productRepo.countAll(words), productRepo.search(words, offset)]).then(values => {
    console.log(words);
    let size = values[0][0].TOTAL;
    console.log(size);

    let result = {
      key: words,
      size: size
    }

    let numberOfPages = Math.ceil((size / config.appConfig.PRODUCTS_PER_PAGE));

    for (let i = 0; i < numberOfPages; i++) {

      pageList.push({
        url: `${url}&page=${i + 1}`,
        isCurPage: (i + 1) === +page,
        val: i + 1
      })
    }

    res.render('search', {
      title: 'Book store',
      products: values[1],
      pages: pageList,
      result

    });
  });

});


router.get('/search/advanded', function (req, res) {
  let data = req.query,
    url = req.url,
    page = req.query.page;

  if (url.lastIndexOf('&page') != -1)
    url = url.substr(0, url.lastIndexOf('&page'));

  if (!page) page = 1;

  let offset = (page - 1) * numberOfItemsInOnePage;

  let pageList = [];

  Promise.all([productRepo.searchAdvanded_All(data), productRepo.searchAdvanded(data, offset)]).then(values => {

    let size = values[0].length;

    let result = {
      key: data.title,
      size: size
    }

    let numberOfPages = Math.ceil((size / numberOfItemsInOnePage));

    for (let i = 0; i < numberOfPages; i++) {

      pageList.push({
        url: `${url}&page=${i + 1}`,
        isCurPage: (i + 1) === +page,
        val: i + 1
      })
    }

    res.render('search', {
      title: 'Book store',
      products: values[1],
      pages: pageList,
      result

    });
  });
});

/* END AN-MT. */
module.exports = router;