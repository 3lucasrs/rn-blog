# Todo-API
## About
📜 Todo-API - A simple API to manage tasks in a MySQL database using Node.js, Express.js, Sequelize, and mysql2.

Project developed in order to practice what I am studying.

---

## Features

- [x] Add a new task to the database
- [x] Retrieve all task from the database
- [x] Modify a task by ID
- [x] Mark a task as completed or not completed
- [x] Delete a task by ID

---

## How it works

### Pre-requisites

Before you begin, make sure you have the following tools installed on your machine: [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [MySQL](https://www.mysql.com/), and a tool like [Postman](https://www.postman.com/) for testing the API endpoints.
In addition, it is good to have an editor to work with the code like [VSCode](https://code.visualstudio.com/)

#### Running the API

```bash

# Clone this repository
$ git clone https://github.com/3lucasrs/task-api.git

# Access the project folder in your terminal
$ cd task-api

# Install the dependencies
$ npm install

# Set up your MySQL database
$ mysql -u your_username -p

# Create the database
mysql> CREATE DATABASE IF NOT EXISTS `todo-api`;
mysql> USE `todo-api`;

# Create the phrases table
mysql> CREATE TABLE IF NOT EXISTS `todos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `done` tinyint(1) DEFAULT '0',
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

# Insert sample data
mysql> INSERT INTO `todos` (`id`, `title`, `done`) VALUES
	(1, 'Estudar programação a tarde', 0),
	(2, 'Ir a academia a noite', 0);

# Exit the MySQL shell
mysql> exit

# Update the Sequelize configuration in todo-api/src/instances/mysql.js with your database credentials

# Run the application

# To start the API, navigate to the project folder in your terminal and run the following command:

$ nodemon src/server.js

# The API be accessible on the port: 3001

```

---

## Tech Stack

The following tools were used in the construction of the project:

#### **Backend**  ([Node.js](https://nodejs.org/en)  +  [Express.js](https://expressjs.com/) + [Sequelize](https://sequelize.org/) + [MySQL](https://www.mysql.com/)) 
