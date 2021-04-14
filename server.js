// reqired const 

const inquirer = require("inquirer")
const mysql = require("mysql2")
const cTable = require('console.table');

// connection to server
// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Ktkh.1218958!?.',
    database: 'employees_db'
  });

connection.connect((err) => {
    if (err) throw err;

    startPrompt();
});


// start question prompts
function startPrompt() {
    inquirer.prompt([
    {
    type: "list",
    message: "What would you like to do?",
    name: "choice",
    choices: [
              "View All Employees", 
              "View All Departments",
              "View All Roles",
              "View all Employees By Deparments", 
              "Update Employee",
              "Add Employee",
              "Add Role",
              "Add Department"
            ]
    }
]).then(function(val) {
        switch (val.choice) {
            case "View All Employees":
              viewAllEmployees();
            break;

            case "View All Departments":
              viewAllDepts();
            break;
    
          case "View All Roles":
              viewAllRoles();
            break;

          case "View all Employees By Deparments":
              viewAllDepartments();
            break;
          
          case "Add Employee":
                addEmployee();
              break;

          case "Update Employee":
                updateEmployee();
              break;
      
            case "Add Role":
                addRole();
              break;
      
            case "Add Department":
                addDepartment();
              break;
    
            }
    })
}

// view employees connection
function viewAllEmployees() {
    connection.query("SELECT * FROM employee;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
  })
};

// view department connection
function viewAllDepts() {
    connection.query("SELECT * FROM department;", 
    function(err, res) {
    if (err) throw err
    console.table(res)
    startPrompt()
    })
  };

  // view roles connection
function viewAllRoles() {
    connection.query("SELECT title, salary, department_id FROM role JOIN department GROUP BY department_id;", 
    function(err, res) {
    if (err) throw err
    console.table(res)
    startPrompt()
    })
  };
  
  // view employees by department conenction
  function viewAllDepartments() {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
    })
  };

  // select title connection
var roleArr = [];
function selectRole() {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }

  })
  return roleArr;
};

// select manager connection
var managersArr = [];
function selectManager() {
  connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managersArr.push(res[i].first_name);
    }

  })
  return managersArr;
};

// add employee function
function addEmployee() { 
    inquirer.prompt([
        {
          name: "firstName",
          type: "input",
          message: "Enter their first name "
        },
        {
          name: "lastName",
          type: "input",
          message: "Enter their last name "
        },
        {
          name: "role",
          type: "list",
          message: "What is their role? ",
          choices: selectRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Whats their managers name?",
            choices: selectManager()
        }
    ]).then(function (val) {
      var roleId = selectRole().indexOf(val.role) + 1
      var managerId = selectManager().indexOf(val.choice) + 1
      connection.query("INSERT INTO employee SET ?", 
      {
          first_name: val.firstName,
          last_name: val.lastName,
          manager_id: managerId,
          role_id: roleId
          
      }, function(err){
          if (err) throw err
          console.table(val)
          startPrompt()
      })

  })
};
  

// employee update function
function updateEmployee() {
    connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
     if (err) throw err
     console.log(res)
    inquirer.prompt([
          {
            name: "lastName",
            type: "rawlist",
            choices: function() {
              var lastName = [];
              for (var i = 0; i < res.length; i++) {
                lastName.push(res[i].last_name);
              }
              return lastName;
            },
            message: "What is the Employee's last name? ",
          },
          {
            name: "role",
            type: "rawlist",
            message: "What is the Employees new title? ",
            choices: selectRole()
          },
      ]).then(function(val) {
        var roleId = parseInt(selectRole().indexOf(val.role) + 1)
        console.log(roleId),
        connection.query("UPDATE employee SET ? WHERE ?", [
        {
          role_id: roleId
        },
        {
          last_name: val.lastName
        }], 
        function(err){
            if (err) throw err
            console.table(val)
            startPrompt()
        })
  
    });
  });
  };

  // add role to employee
function addRole() { 
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, res) {
      inquirer.prompt([
          {
            name: "Title",
            type: "input",
            message: "What is the roles Title?"
          },
          {
            name: "Salary",
            type: "input",
            message: "What is the Salary?"
  
          } 
      ]).then(function(res) {
          connection.query(
              "INSERT INTO role SET ?",
              {
                title: res.Title,
                salary: res.Salary,
              },
              function(err) {
                  if (err) throw err
                  console.table(res);
                  startPrompt();
              }
          )
  
      });
    });
    };

    //Add Department
function addDepartment() { 

    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What Department would you like to add?"
        }
    ]).then(function(res) {
        var query = connection.query(
            "INSERT INTO department SET ? ",
            {
              name: res.name
            
            },
            function(err) {
                if (err) throw err
                console.table(res);
                startPrompt();
            }
        )
    })
  };
  