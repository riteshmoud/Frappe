
# Frappe Library Management System

The Library Management System allows a librarian to keep track of books and their stocks, books issued to members, book fees and major transactions.

## Features
- Import books from [Frappe API](https://frappe.io/api/method/frappe-library)
- Add members to the database
- Issue books to members
- Manage return of books
- Search books and members from the database
- Edit and delete books or members
- View all issued books of a member
- Keep track of issue and return transactions
- Keep track book fees and penalties


## Tech Stack

**Client:** JavaScript, React, MaterialUI

**Server:** Django, Python, MySQL


## Prerequisites

Following things should be installed on your machine

- Python
- SQL
- MySQL Workbench

***Note***: [Click Here](https://dev.mysql.com/downloads/windows/installer/8.0.html) to download SQL and MySQL from MySQL website. Make sure to install SQL and MYSQL workbench both.

## Installation

- Clone the project
This project has client side, server side and database

### Database setup

First, we will create database for our project

- We must ensure that our MySQL service is up and running.
- To do that, open Task Manager > Services
- Search for MySQL and make sure its status is Running.


[![Screenshot](https://i.postimg.cc/hjjbsnwK/Screenshot-2023-08-16-201148.png)](https://postimg.cc/06Tw5TP4)

- Now, we open MySQL workbench and create the database.
- If you create a new user or use default root, then update the username and password in **backend > backend > settings.py** file in the **USER** and **PASSWORD** field.

[![Screenshot](https://i.postimg.cc/6Q4V7K8S/Screenshot-2023-08-16-205202.png)](https://postimg.cc/hJgQwHbb)

- Now open the query file and run following query

```bash
  create database frappe_library;
```
And that's it for the database configuration.

### Server setup

- Open the folder directory containing the project in terminal. Change directory

```bash
  cd backend
```

First, we create virtual environment. Hit following commands one by one.

```bash
 pip install virtualenv
 virtualenv .venv
 ./.venv/Scripts/activate
```

The above commands will install, create and activate the virtual environment. You should see (.venv) at start on terminal prompt indicating that you are in virtual environment.

[![Screenshot](https://i.postimg.cc/1RKNWXwP/Screenshot-2023-08-16-210228.png)](https://postimg.cc/MXvTHW9r)

- Now install requirements.txt

```bash
 pip install -r requirements.txt
```

- At last, we need to migrate changes to database. For that, there are two commands to hit.

```bash
 python manage.py makemigrations
 python manage.py migrate
```

- That's it, now it is time to run the server.

```bash
  python manage.py runserver
```

### Client setup

- Change the directory to client folder and install the dependencies

```bash
  npm install
```
- Run the client side

```bash
  npm start
```

Whooo!!!.. the project is now up and running.

## Screenshots

[![Screenshot-2023-08-16-211834.png](https://i.postimg.cc/sDSzs69J/Screenshot-2023-08-16-211834.png)](https://postimg.cc/ykVtTTGJ)

[![Screenshot-2023-08-16-211850.png](https://i.postimg.cc/52VV0BsW/Screenshot-2023-08-16-211850.png)](https://postimg.cc/4mBM29CW)

[![Screenshot-2023-08-16-211941.png](https://i.postimg.cc/CK56LdpV/Screenshot-2023-08-16-211941.png)](https://postimg.cc/67shMWQH)

[![Screenshot-2023-08-16-211958.png](https://i.postimg.cc/5trKH1fQ/Screenshot-2023-08-16-211958.png)](https://postimg.cc/PLmQcgpd)

[![Screenshot-2023-08-16-212042.png](https://i.postimg.cc/L6F7BHLz/Screenshot-2023-08-16-212042.png)](https://postimg.cc/XXxQn62J)

[![Screenshot-2023-08-16-212124.png](https://i.postimg.cc/zXwQx9F4/Screenshot-2023-08-16-212124.png)](https://postimg.cc/LnXvXQ7V)

[![Screenshot-2023-08-16-212147.png](https://i.postimg.cc/W1XHvgKn/Screenshot-2023-08-16-212147.png)](https://postimg.cc/nX9kKjnj)

[![Screenshot-2023-08-16-212222.png](https://i.postimg.cc/KjS9NNkZ/Screenshot-2023-08-16-212222.png)](https://postimg.cc/R6dQCwL8)

[![Screenshot-2023-08-16-212235.png](https://i.postimg.cc/3xKcVnLN/Screenshot-2023-08-16-212235.png)](https://postimg.cc/hf5s7bRR)

