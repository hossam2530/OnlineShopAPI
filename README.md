# Storefront Backend Project

## Getting Started

### Prerequisites
1-node 19
2-postgres database 
3-psql in your os system environment variable


### prepare Environment Varaiable
open .env file or create one in the project root dirictory if not exist 
put the the following values based on your system

SERVER_PORT=1983 # feel free to change it
SECRET_SALT=
SALT_ROUND=
DB_SERVER= #add your postgrees database host or localhost if its exist in the same server
DB_PORT= # add your db port or 5432 if you use the default port
DB_NAME= # add your db name (schema) 
DB_NAME_TEST= #add another db for being used for test
DB_USER= # your db user name (must have access on selected databases)  
DB_PASS= # your db password 

JWT_SECRET=

### installation
1- extract archived file 
2- open OnlineShopAPI dir
3- open terminal and navigate to OnlineShopAPI dir 
4- install required packages 
    npm install
5- create 2 databases one for the api and one for testing
    you have to change any ${place_holder} with your chosen value
    2.1 create ${DB_NAME}  
        - open terminal
        - write: psql -U ${dbuser}
        - write the password in the prompt
        - CREATE DATABASE ${DB_NAME};   -- ex: CREATE DATABASE xyz; 
        - press enter

     2.2 create ${DB_NAME_TEST} (feel free to choose the name that you need)
        - continue from 2.1 
        - CREATE DATABASE ${DB_NAME_TEST}; -- ex: CREATE DATABASE xyz_test;
        - press enter
        - exit

6- migrate db schema :
    don't forget to fill all values in .env file before start migration
    3.1 to create the schema for the main (prod) db run: 
        npx db-migrate up -e prod
    3.2 to create the schema for the test db 
        npx db-migrate up -e test

### Notes
- the UserModel uses login to retrive token and the token has expiration time
    so that you have to login again if the token expire.
- the system is developed and tested on windows platform
    if you change the os be sure to open package.json and modify scripts to work on your os



