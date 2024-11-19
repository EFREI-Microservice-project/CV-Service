const CvModel = require("../models/Cv");
const ReviewModel = require("../models/Review");
const { verifyCv } = require("../validator/CvValidator");
const axios = require("axios");

const USER_SERVICE_URL = "http://localhost:3002/api/users";

const CvController = {
    create: async (req, res) => {
        try {
            verifyCv(req.body);

            const userResponse = await axios.get(`${USER_SERVICE_URL}/me`, {
                headers: { Authorization: req.headers.authorization },
            });
            const authenticatedUser = userResponse.data;

            if (!authenticatedUser) {
                return res.status(403).json({ message: "Utilisateur non authentifié." });
            }

            if (authenticatedUser.cv) {
                return res.status(403).json({ message: "Un CV existe déjà pour cet utilisateur." });
            }

            const cv = new CvModel({
                userId: authenticatedUser.id,
                ...req.body,
            });

            const savedCv = await cv.save();

            await axios.patch(`${USER_SERVICE_URL}/${authenticatedUser.id}`, {
                cv: savedCv._id,
            });

            res.status(201).send(savedCv);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const cv = await CvModel.findById(req.params.id);

            if (!cv) {
                return res.status(404).json({ message: "CV non trouvé." });
            }

            const userResponse = await axios.get(`${USER_SERVICE_URL}/me`, {
                headers: { Authorization: req.headers.authorization },
            });
            const authenticatedUser = userResponse.data;

            if (authenticatedUser.id !== cv.userId && !authenticatedUser.isAdmin) {
                return res.status(403).json({ message: "Vous n'êtes pas autorisé à supprimer ce CV." });
            }

            await ReviewModel.deleteMany({ cv: cv._id });
            await cv.deleteOne();

            res.status(200).json({ message: "CV supprimé avec succès." });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const cv = await CvModel.findById(req.params.id);

            if (!cv) {
                return res.status(404).json({ message: "CV non trouvé." });
            }

            const userResponse = await axios.get(`${USER_SERVICE_URL}/me`, {
                headers: { Authorization: req.headers.authorization },
            });
            const authenticatedUser = userResponse.data;

            if (authenticatedUser.id !== cv.userId) {
                return res.status(403).json({ message: "Vous n'êtes pas autorisé à modifier ce CV." });
            }

            Object.assign(cv, req.body);
            const updatedCv = await cv.save();

            res.status(200).json({ message: "CV mis à jour avec succès.", cv: updatedCv });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    findOneCV: async (req, res) => {
        try {
            const cv = await CvModel.findById(req.params.id).populate("review");

            if (!cv) {
                return res.status(404).json({ message: "CV non trouvé." });
            }

            res.status(200).json(cv);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    findAllPublicCv: async (req, res) => {
        try {
            const cvs = await CvModel.find({ private: false }).select("_id title userId");

            const cvDetails = cvs.map((cv) => ({
                id: cv._id,
                title: cv.title,
                userId: cv.userId,
            }));

            res.status(200).json(cvDetails);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = CvController;
