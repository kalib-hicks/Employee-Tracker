/* use db */
USE employees_db;


/* role variables */
INSERT INTO department (name) VALUES ("Human Resources");
INSERT INTO department (name) VALUES ("SM Marketing");
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Corporate");

/* employee variables*/
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Steve", "Rogers", 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Natasha", "Romanoff", 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Wanda", "Maximoff", 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("James", "Barnes", 4);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Tony", "Stark", 5);