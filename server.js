// reqired const 

const inquirer = require("inquirer")
const mysql = require("mysql2")
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employees_db"
  });