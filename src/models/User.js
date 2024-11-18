const mongoose = require("mongoose");
const Role = require("../enum/RolesEnum");

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: [Role.ADMIN, Role.USER],
        required: false,
        default: Role.USER,
    },

    cv: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cv",
    },
});

module.exports = mongoose.model("User", UserSchema);
