'use strict';

var mysql = require('mysql');
var config = require('../config/config.js');

exports.load = sql => {
      return new Promise((resolve, reject) => {
            var cn = mysql.createConnection(config.mysqlConfig);

           cn.connect(function (err) {
                 if (err) throw err;
                 
           });

            cn.query(sql, function (error, rows, fields) {
                  if (error) {            
                        reject(error);
                  } else {
                        resolve(rows);
                  }

                  cn.end();
            });
      });
}

exports.save = sql => {
      return new Promise((resolve, reject) => {
            var cn = mysql.createConnection(config.mysqlConfig);

            cn.connect();

            cn.query(sql, function (error, value) {
                  if (error) {
                        reject(error);
                  } else {
                        resolve(value);
                  }

                  cn.end();
            });
      });
}