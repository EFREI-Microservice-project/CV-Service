const router = require("express").Router();
const UserController = require("../controller/UserController");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User related API endpoints
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Récupérer ses informations
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à modifier
 *     responses:
 *       201:
 *         description: Récupération des informations
 *       400:
 *         description: Requête invalide
 */
router.get("/:id", UserController.show);

/**
 * @swagger
 * /user/{id}:
 *   patch:
 *     summary: Modifier ses informations
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à modifier
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Informations modifés avec succès
 *       400:
 *         description: Requête invalide
 */
router.patch("/:id", UserController.edit);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Supprime un utilisateur
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       401:
 *         description: Échec de la suppression (authentification requise)
 *       404:
 *         description: Utilisateur non trouvé
 */
router.delete("/:id", UserController.delete);

module.exports = router;
