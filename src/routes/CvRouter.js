const router = require("express").Router();
const CvController = require("../controller/CvController");

/**
 * @swagger
 * tags:
 *   name: Cv
 *   description: Cv related API endpoints
 */

router.post("/", CvController.create);
