const CvModel = require("../models/Cv");
const UserModel = require("../models/User");
const { getAuthenticatedUser } = require("../utils/Security/SecurityHelper");
const { verifyCv } = require("../validator/CvValidator");

const CvController = {
    create: async (req, res) => {
        try {
            verifyCv(req.body);

            const authenticatedUser = await getAuthenticatedUser(req);
            const { user } = req.body;

            if (!authenticatedUser) {
                return res.status(403).json({
                    message: "Vous devez être connecté(e) pour créer un CV.",
                });
            }

            const cv = new CvModel({
                user: user._id,
            });

            const savedCv = await cv.save();
            await UserModel.findByIdAndUpdate(req.body.userId, { cv: savedCv._id });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = CvController;
