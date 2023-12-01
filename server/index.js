const express = require("express");
const cors = require("cors");
const route = require("./Config/router");
const dbconnection = require("./Config/dbconnection");
const bodyParser = require("body-parser");
const port = 3001;
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
dbconnection();
app.use(route);
app.use("/Images", express.static("Images"));
app.listen(port, () => {
  console.log(`server is running in the port ${port}`);
});
