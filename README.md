# student-management-api
Hosted in **https://lt-student-management-api.herokuapp.com/**

## Software
The following software are used and are required for the project to run locally. Installation of each will not be discussed on this guide.

* Node v14.5.0
* MySQL 8.0.26

## Setup
### Clone the Project
```bash
git clone https://github.com/jmrrgncpz/student-management-api.git
```

### Environment variables
1. In the project's root directory, create an `.env` file and assign the values appropriately

For example:
```
 APP_PORT=4000
 DB_HOST=localhost
 DB_USER=<your_db_user>
 DB_PASS=<your_db_password>
 DB_NAME=development-student-management
 DB_DIALECT=mysql
 DB_PORT=3306
 APP_HOST=localhost
 NODE_ENV=development
 ```
2. Still in the project's root directory, create an `.env.test` file and assign the values appropriately. 

**Note that the DB_NAME is different for development and test environment**

For example:
```
  APP_PORT=4000
  DB_HOST=localhost
  DB_USER=<your_db_user>
  DB_PASS=<your_db_password>
  DB_NAME=test-student-management
  DB_DIALECT=mysql
  DB_PORT=3306
  APP_HOST=localhost
  NODE_ENV=test
 ```
### Install dependencies
```bash
npm i
```

### Initialize DB
```bash
npm run db:create
npm run db:migrate
````

## Run the API
```bash
npm run dev
```

## Run tests
```bash
npm run test
```
