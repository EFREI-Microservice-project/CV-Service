require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || "3003";
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const apiRouter = require("./routes");
const cors = require("cors");

const corsOptions = {
    origin: "http://localhost:8001",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "MyCv API",
            description: "Swagger for MyCvApi. All routes start with '/api'",
            version: "1.1.0",
        },
    },
    apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Database connected");
    })
    .catch((error) => {
        console.log(`Database connection error ${error}`);
    });

app.use("/api/", apiRouter);

app.listen(port, () => {
    console.log("server is running");
});
