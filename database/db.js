'use strict';

const mysql = require("mysql");

var database = {
      initDatabase: function() {
            this.pool = mysql.createPool({

            });
      },

      query: function(query, callback) {
            this.pool.query(query, function(err, res) {
                  if (err) {
                        this.initDatabase();
                        callback(err, res);
                  } else {
                        callback(err, res);
                  }
            });
      },

      disconnect: function() {
            if (this.pool) {
                  this.pool.end();
            }
      }
};

module.exports = database;