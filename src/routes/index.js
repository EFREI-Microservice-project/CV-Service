const express = require("express");
const CvRouter = require("./CvRouter");

const app = express();

app.use("/cv", CvRouter);

module.exports = app;
