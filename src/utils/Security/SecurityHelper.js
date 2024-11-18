const jwt = require("jsonwebtoken");
const UserModel = require("../../models/User");
const Role = require("../../enum/RolesEnum");

const getAuthenticatedUser = async (req) => {
    try {
        let token = req.headers["authorization"].replace("Bearer ", "");
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);

        return UserModel.findById(userId);
    } catch (error) {
        console.log(error);

        return null;
    }
};

const isUserOwner = (requestingUser, ownerUser) => {
    return requestingUser ? requestingUser._id.toString() === ownerUser._id.toString() : false;
};

const isUserAdmin = (requestingUser) => {
    return requestingUser ? requestingUser.role === Role.ADMIN : false;
};

module.exports = { getAuthenticatedUser, isUserOwner, isUserAdmin };
