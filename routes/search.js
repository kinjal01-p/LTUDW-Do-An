var express = require('express');
var productRepo = require('../database/repos/productRepo.js');
var config = require('../config/config.js');
var router = express.Router();

router.get('/normal', function (req, res) {
      let words = req.query.q,
            url = '/search' + req.url,
            page = req.query.page;

      if (url.lastIndexOf('&page') != -1)
            url = url.substr(0, url.lastIndexOf('&page'));

      if (!page) page = 1;

      let offset = (page - 1);

      let pageList = [];

      Promise.all([productRepo.countAllSearch(words), productRepo.search(words, offset)]).then(values => {
            let size = values[0][0].TOTAL;

            let result = {
                  instruction: `Kết quả tìm kiếm cho "${words}"`,
                  total: `${size} kết quả`
            }

            let numberOfPages = Math.ceil((size / config.appConfig.PRODUCTS_PER_PAGE));

            for (let i = 0; i < numberOfPages; i++) {
                  pageList.push({
                        url: `${url}&page=${i + 1}`,
                        isCurPage: (i + 1) === +page,
                        val: i + 1
                  });
            }

            var prevPage = {
                  url: `${url}&page=${+page - 1}`,
                  isOK: 1 !== +page
            }

            var nextPage = {
                  url: `${url}&page=${+page + 1}`,
                  isOK: numberOfPages !== +page
            }

            res.render('list_product', {
                  title: 'Book store',
                  products: values[1],
                  pages: pageList,
                  result,
                  prevPage,
                  nextPage
            });
      });
});

router.get('/advanded', function (req, res) {
      let data = req.query,
            url = '/search' + req.url,
            page = req.query.page;

      if (url.lastIndexOf('&page') != -1)
            url = url.substr(0, url.lastIndexOf('&page'));

      if (!page) page = 1;

      let offset = (page - 1);

      let pageList = [];
      
      Promise.all([productRepo.countAllSearchAdvanded(data), productRepo.searchAdvanded(data, offset)]).then(values => {
            let size = values[0][0].TOTAL;

            let result = {
                  instruction: `Kết quả tìm kiếm nâng cao`,
                  total: `${size} kết quả`
            }

            let numberOfPages = Math.ceil((size / config.appConfig.PRODUCTS_PER_PAGE));

            for (let i = 0; i < numberOfPages; i++) {
                  pageList.push({
                        url: `${url}&page=${i + 1}`,
                        isCurPage: (i + 1) === +page,
                        val: i + 1
                  });
            }

            var prevPage = {
                  url: `${url}&page=${+page - 1}`,
                  isOK: 1 !== +page
            }

            var nextPage = {
                  url: `${url}&page=${+page + 1}`,
                  isOK: numberOfPages !== +page
            }

            res.render('list_product', {
                  title: 'Book store',
                  products: values[1],
                  pages: pageList,
                  result,
                  prevPage,
                  nextPage
            });
      });
});

module.exports = router;