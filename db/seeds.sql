/* check if database exists already */

DROP DATABASE IF EXISTS employees_db;

/* create databse */
CREATE database employees_db;

USE employees_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

/* role creation table */
CREATE TABLE role (
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL (8,2),
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) references department(id)
);

/*employee creation table*/
CREATE TABLE employee (
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department (name) VALUES ("HR");
INSERT INTO department (name) VALUES ("Advertising");
INSERT INTO department (name) VALUES ("Corporate");


INSERT INTO role (title, salary, department_id) VALUES ("CEO", 100000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Team Leader", 50000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Front End Developer", 80000.00, 1);

INSERT INTO employee (first_name, last_name, role_id) VALUES ("Scooby", "Doo", 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Micheal", "Myers", 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Kalib", "Hicks", 3, 1);
