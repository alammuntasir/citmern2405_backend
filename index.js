const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const dbconnection = require("./src/config/dbconfig");
const router = require("./src/config/route");
const errorhandlingMiddelware = require("./src/config/utils/errorhandling");
const pathNotFound = require("./src/config/utils/pathnotfound");

const app = express();
const port = process.env.PORT || 4000;
// database connection
dbconnection();

// http://localhost:3000

// router middelware
app.use(router);

// page not found middelware

app.use(pathNotFound);

app.use(errorhandlingMiddelware);

app.listen(port, () => { 
  console.log(`server is running port number ${port}`);
});
