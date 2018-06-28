var express = require('express');
var productRepo = require('../database/repos/productRepo.js');
var typeRepo = require('../database/repos/typeRepo.js');
var manuRepo = require('../database/repos/manufacturerRepo.js');
var config = require('../config/config.js');
var router = express.Router();

router.get('/all', function (req, res) {
      var url = '/products' + req.url;
      var page = req.query.page;

      if (url.lastIndexOf('?page') != -1)
            url = url.substr(0, url.lastIndexOf('?page'));

      if (!page) page = 1;

      let offset = (page - 1);

      let pageList = [];

      Promise.all([productRepo.countAllProducts(), productRepo.loadAll(offset)]).then(values => {
            let total = values[0][0].TOTAL;

            let result = {
                  instruction: 'Tất cả có tổng cộng',
                  total: `${total} sản phẩm`
            }

            let numberOfPages = Math.ceil((total / config.appConfig.PRODUCTS_PER_PAGE));

            for (let i = 0; i < numberOfPages; i++) {
                  pageList.push({
                        url: `${url}?page=${i + 1}`,
                        isCurPage: (i + 1) === +page,
                        val: i + 1
                  });
            }

            var prevPage = {
                  url: `${url}?page=${+page - 1}`,
                  isOK: 1 !== +page
            }

            var nextPage = {
                  url: `${url}?page=${+page + 1}`,
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

router.get('/byManu/:id_Manufacturer', function (req, res) {
      var id_Manufacturer = req.params.id_Manufacturer;
      var url = '/products' + req.url;
      var page = req.query.page;

      if (url.lastIndexOf('?page') != -1)
            url = url.substr(0, url.lastIndexOf('?page'));

      if (!page) page = 1;

      let offset = (page - 1);

      let pageList = [];

      Promise.all([productRepo.countByManufacturer(id_Manufacturer), productRepo.loadAllByManufacturer(id_Manufacturer, offset), manuRepo.single(id_Manufacturer)]).then(values => {
            let total = values[0][0].TOTAL;
            var nameManufacturer = values[2][0].name;

            let result = {
                  instruction: `"${nameManufacturer}" có tổng cộng`,
                  total: `${total} sản phẩm`
            }

            let numberOfPages = Math.ceil((total / config.appConfig.PRODUCTS_PER_PAGE));

            for (let i = 0; i < numberOfPages; i++) {
                  pageList.push({
                        url: `${url}?page=${i + 1}`,
                        isCurPage: (i + 1) === +page,
                        val: i + 1
                  });
            }

            var prevPage = {
                  url: `${url}?page=${+page - 1}`,
                  isOK: 1 !== +page
            }

            var nextPage = {
                  url: `${url}?page=${+page + 1}`,
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

router.get('/byClass/:id_Class', function (req, res) {
      var id_Class = req.params.id_Class;
      var url = '/products' + req.url;
      var page = req.query.page;

      if (url.lastIndexOf('?page') != -1)
            url = url.substr(0, url.lastIndexOf('?page'));

      if (!page) page = 1;

      var offset = (page - 1);

      var pageList = [];

      Promise.all([productRepo.countByType(id_Class), productRepo.loadAllByType(id_Class, offset), typeRepo.single(id_Class)]).then(values => {
            let total = values[0][0].TOTAL;
            var nameType = values[2][0].name;

            var result = {
                  instruction: `Loại sách "${nameType}" có tổng cộng`,
                  total: `${total} sản phẩm`
            }

            var numberOfPages = Math.ceil((total / config.appConfig.PRODUCTS_PER_PAGE));

            for (var i = 0; i < numberOfPages; i++) {
                  pageList.push({
                        url: `${url}?page=${i + 1}`,
                        isCurPage: (i + 1) === +page,
                        val: i + 1
                  });
            }

            var prevPage = {
                  url: `${url}?page=${+page - 1}`,
                  isOK: 1 !== +page
            }

            var nextPage = {
                  url: `${url}?page=${+page + 1}`,
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

router.get('/byPrice', function (req, res) {
      var url = '/products' + req.url;
      var page = req.query.page;
      var min = req.query.min;
      var max = req.query.max;

      if (url.lastIndexOf('&page') != -1)
            url = url.substr(0, url.lastIndexOf('&page'));

      if (!page) page = 1;

      let offset = (page - 1);

      let pageList = [];

      Promise.all([productRepo.countAllByPrice(min, max), productRepo.loadAllByPrice(min, max, offset)]).then(values => {
            let total = values[0][0].TOTAL;

            let result = {
                  instruction: 'Có tổng cộng',
                  total: `${total} sản phẩm`
            }

            let numberOfPages = Math.ceil((total / config.appConfig.PRODUCTS_PER_PAGE));

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