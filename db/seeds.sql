USE employees_db;

INSERT INTO department (name) VALUES ("Human Resources");
INSERT INTO department (name) VALUES ("SM Marketing");
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Corporate");

INSERT INTO role (title, salary, department_id) VALUES ("Sales Rep", 70000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Communications Associate", 50000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Social Media Manager", 50000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Director", 100000.00, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Director", 100000.00, 4);

INSERT INTO employee (first_name, last_name, role_id) VALUES ("Steve", "Rogers", 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Natasha", "Romanoff", 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Wanda", "Maximoff", 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("James", "Barnes", 4);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Tony", "Stark", 5);