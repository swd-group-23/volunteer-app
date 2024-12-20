# volunteer-app
Project for COSC 4353

> A non-profit organization has requested to build a software application that will help manage and optimize their volunteer activities. The application should help the organization efficiently allocate volunteers to different events and tasks based on their preferences, skills, and availability. 


# Installation Instructions: 
- clone the repository on github
    `git clone https://github.com/swd-group-23/volunteer-app.git`
- cd into the server directory
    `cd server `
- install server node dependencies
    `npm i`
- cd into the client directory
    `cd ../client`
- install client node dependencies
    `npm i`

# Configuration Details: 
> The client directory requires a .env configuration file to run
- cd into the client
    `cd ../client`
- cd into the `src` directory
    `cd src`
- create a `.env` file in the root level of the `src` directory
- add the following information to the .env
```.env
VITE_REACT_APP_NODE_ENV = development
VITE_REACT_APP_SERVER_BASE_URL_DEV = http://localhost:4000
```
> The server directory requires a .env configuration file to run
- cd into the server
    `cd ../server`
- create a `.env` file in the root level of the `server` directory
- **NOTE**: The MongoURI connection string will not be shown in the README to not expose the Database password. Please view the Assignment 4 document to get the MongoDB Connection string
- add the following information to the .env (__MONGO_URI__ will NOT be included - please check Assignment 4 document for details)
```.env
__MONGO_URI__= --------------------
__MONGO_DB_NAME__="Volunteer-db"
__MONGO_DB_NAME_TEST__="Volunteer-db-TEST"
```

# Running the Project: 
- cd into the server
    `cd ../server`
- run the server
    `npm run dev`
- cd into the client
    `cd ../client`
- run the client
    `npm run dev`
- click the localhost link to view the app

# Testing the Project:
- cd into the server
    `cd ../server`
- run the test script
    `npm run test`

# Troubleshooting Tips
- Ensure node and npm version is up to date
    - [Resource](https://www.freecodecamp.org/news/how-to-update-node-and-npm-to-the-latest-version/)