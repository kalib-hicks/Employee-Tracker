// reqired const 

const inquirer = require("inquirer")
const mysql = require("mysql2")
const cTable = require('console.table');

// connection to server
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employees_db"
  });

  connection.connect(function(err) {
    if (err) throw err
    console.log("Connected as Id" + connection.threadId)
    startPrompt();
});