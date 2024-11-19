const express = require("express");
const CvRouter = require("./Cvouter");

const app = express();

app.use("/cv", CvRouter);

module.exports = app;
