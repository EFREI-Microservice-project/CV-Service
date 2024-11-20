const express = require("express");
const CvRouter = require("./Cvrouter");

const app = express();

app.use("/cv", CvRouter);

module.exports = app;
