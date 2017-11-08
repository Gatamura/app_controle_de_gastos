const mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'gabriel00',
  database : 'app_de_pagamentos'
});

module.exports = connection;
