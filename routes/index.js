var express = require('express');
var productRepo = require('../database/repos/productRepo.js');
var router = express.Router();


// Demo data
var top_ten = [{
    name: "7 Thoi quen...",
    id_product: 1,
    price: 60000
  },
  {
    name: "Dam nghi lon...",
    id_product: 2,
    price: 60000
  },
  {
    name: "7 Thoi quen...",
    id_product: 1,
    price: 60000
  },
  {
    name: "Dam nghi lon...",
    id_product: 2,
    price: 60000
  },
  {
    name: "7 Thoi quen...",
    id_product: 1,
    price: 60000
  },
  {
    name: "Dam nghi lon...",
    id_product: 2,
    price: 60000
  },
  {
    name: "7 Thoi quen...",
    id_product: 1,
    price: 60000
  },
  {
    name: "Dam nghi lon...",
    id_product: 2,
    price: 60000
  },
  {
    name: "7 Thoi quen...",
    id_product: 1,
    price: 60000
  },
  {
    name: "Dam nghi lon...",
    id_product: 2,
    price: 60000
  }
]

 const numberOfItemsInOnePage = 20;

/* GET home page. */
router.get('/', function (req, res, next) {

  Promise.all([productRepo.top_new(), productRepo.top_sale(), productRepo.top_viewed()]).then(values => {
    
    res.render('index', {
      title: 'Book store',
      top_new: values[0],
      top_sale: values[1],
      top_viewed: values[2],
      products: top_ten
    });
  });
});

/* ADD AN-MT: add normal search and advanded search */
router.get('/search/normal', function (req, res) {

  let key = req.query.q,
    words = key.split(' '),
    url = req.url,
    page = req.query.page;

    if (url.lastIndexOf('&page') != -1)
      url = url.substr(0, url.lastIndexOf('&page'));
  
      if (!page) page = 1;


  let offset = (page - 1) * numberOfItemsInOnePage;

  let pageList = [];

  Promise.all([ productRepo.searchAll(words), productRepo.search(words, offset)]).then(values => {

    let size = values[0].length;
    
    let result = {   key : key, size  :size }

    let numberOfPages = Math.ceil((size / numberOfItemsInOnePage));

    for (let i = 0; i < numberOfPages; i++) {

      pageList.push({
        url: `${url}&page=${i + 1}`,
        isCurPage: (i + 1) === +page,
        val: i+1
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

  Promise.all([productRepo.searchAdvanded_All(data), productRepo.searchAdvanded(data, offset)
  ]).then(values => {

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