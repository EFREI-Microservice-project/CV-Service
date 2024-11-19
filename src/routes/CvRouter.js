const router = require("express").Router();
const CvController = require("./../controller/CvController");

/**
 * @swagger
 * tags:
 *   name: Cv
 *   description: Cv related API endpoints
 */

/**
 * @swagger
 * /cv/createCv:
 *   post:
 *     summary: Création d'un nouveau CV
 *     tags: [Cv]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               title:
 *                 type: string
 *               education:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     school:
 *                       type: string
 *                     formation:
 *                       type: string
 *                     description:
 *                       type: string
 *                     startDate:
 *                       type: number
 *                     endDate:
 *                       type: number
 *               experience:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     compagny:
 *                       type: string
 *                     position:
 *                       type: string
 *                     startDate:
 *                       type: number
 *                     endDate:
 *                       type: number
 *               biography:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *               softSkills:
 *                 type: array
 *                 items:
 *                   type: string
 *               telephone:
 *                 type: number
 *               linkedin:
 *                 type: string
 *               private:
 *                 type: boolean
 *               language:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: CV créé avec succès
 *       400:
 *         description: Requête invalide
 */
router.post("/createCv", CvController.create);

/**
 * @swagger
 * /cv/getAllPubliccv:
 *   get:
 *     summary: Récupérer tous les des CV publics sans détails
 *     tags: [Cv]
 *     responses:
 *       200:
 *         description: Liste de CV avec détails minimalistes
 */
router.get("/getAllPublicCv", CvController.findAllPublicCv);

/**
 * @swagger
 * /cv/update/{id}:
 *   post:
 *     summary: Mettre à jour un CV
 *     tags: [Cv]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du CV
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               education:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     school:
 *                       type: string
 *                     formation:
 *                       type: string
 *                     description:
 *                       type: string
 *                     startDate:
 *                       type: number
 *                     endDate:
 *                       type: number
 *               experience:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     compagny:
 *                       type: string
 *                     position:
 *                       type: string
 *                     startDate:
 *                       type: number
 *                     endDate:
 *                       type: number
 *               biography:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *               softSkills:
 *                 type: array
 *                 items:
 *                   type: string
 *               telephone:
 *                 type: number
 *               linkedin:
 *                 type: string
 *               private:
 *                 type: boolean
 *               language:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: CV mis à jour avec succès
 *       400:
 *         description: Requête invalide
 */
router.patch("/update/:id", CvController.update);

/**
 * @swagger
 * /cv/{id}:
 *   get:
 *     summary: Récupérer un CV par ID
 *     tags: [Cv]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du CV
 *     responses:
 *       200:
 *         description: Détails du CV
 *       404:
 *         description: CV non trouvé
 */
router.get("/:id", CvController.findOneCV);

/**
 * @swagger
 * /cv/{id}:
 *   delete:
 *     summary: Supprimer un CV par ID
 *     tags: [Cv]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du CV
 *     responses:
 *       200:
 *         description: CV supprimé avec succès
 *       404:
 *         description: CV non trouvé
 */
router.delete("/:id", CvController.delete);

module.exports = router;
