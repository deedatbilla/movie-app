/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

// /postgres
//portable12

const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const { handler: getAllMovies } = require("./handlers/get-all-movies");
const { handler: addMovie } = require("./handlers/add-movie");
const { handler: addDirector } = require("./handlers/add-director");
const { handler: getMovie } = require("./handlers/get-movie");
const { handler: getDirector } = require("./handlers/get-director");
const { handler: getAllDirectors } = require("./handlers/get-all-directors");
// declare a new express app
const app = express();
const PORT = 5000;
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

/**********************
 * Example get method *
 **********************/

app.get("/all-movies", function (req, res) {
  getAllMovies({ request: req, response: res });
});
app.get("/all-directors", function (req, res) {
  getAllDirectors({ request: req, response: res });
});

app.get("/get-movie/:id", function (req, res) {
  getMovie({ request: req, response: res });
});

app.get("/get-director/:id", function (req, res) {
  getDirector({ request: req, response: res });
});

app.post("/add-movie", function (req, res) {
  addMovie({ request: req, response: res });
});

app.post("/add-director", function (req, res) {
  addDirector({ request: req, response: res });
});


app.listen(PORT, function () {
  console.log(`App started on  port ${PORT}`);
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
