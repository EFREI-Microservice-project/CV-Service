const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const { getAuthenticatedUser, isUserOwner, isUserAdmin } = require("../utils/Security/SecurityHelper");

module.exports = {
    show: async (req, res) => {
        try {
            const user = req.params.id ? await UserModel.findById(req.params.id) : null;
            const authenticatedUser = await getAuthenticatedUser(req);

            if (!isUserOwner(authenticatedUser, user)) {
                return res.status(403).send({
                    message: "Vous n'êtes pas autorisé à voir les informations de cet utilisateur.",
                });
            }

            res.send({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || "Erreur 500 : Impossible de récupérer les informations de l'utilisateur",
            });
        }
    },

    edit: async (req, res) => {
        try {
            const user = req.params.id ? await UserModel.findById(req.params.id) : null;
            const authenticatedUser = await getAuthenticatedUser(req);

            if (!isUserOwner(authenticatedUser, user)) {
                return res.status(403).send({
                    message: "Vous n'êtes pas autorisé à changer les informations de cet utilisateur.",
                });
            }

            user.firstname = req.body.firstname || user.firstname;
            user.lastname = req.body.lastname || user.lastname;
            user.email = req.body.email || user.email;

            if (req.body.password) {
                user.password = await bcrypt.hash(req.body.password, 10);
            }

            user.role = req.body.role || user.role;

            await user.save();

            res.send({
                message: "Informations mis à jour avec succès",
                user: {
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    role: user.role,
                },
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || "Impossible de mettre à jour les informations",
            });
        }
    },

    delete: async (req, res) => {
        const authenticatedUser = await getAuthenticatedUser(req);

        if (!isUserAdmin(authenticatedUser)) {
            return res.status(403).send({
                message: "Vous n'êtes pas autorisé à supprimer un utilisateur",
            });
        }

        try {
            const user = await UserModel.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.status(404).send({
                    message: "Utilisateur non trouvé",
                });
            }
            res.send({
                message: "Utilisateur supprimé avec succès",
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || "Impossible de supprimer l'utilisateur",
            });
        }
    },
};
