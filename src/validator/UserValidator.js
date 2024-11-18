const { Validator } = require("jsonschema");
const Role = require("../enum/RolesEnum");

module.exports = {
    verifyUser: (user) => {
        if (!user) {
            throw new Error("User Information not provided");
        }
        let validator = new Validator();
        let userSchema = {
            type: "object",
            properties: {
                firstname: {
                    type: "string",
                    minLength: 3,
                    errorMessage: "Firstname is invalid",
                },
                lastname: {
                    type: "string",
                    minLength: 3,
                    errorMessage: "Lastname is invalid",
                },
                email: {
                    type: "string",
                    format: "email",
                    errorMessage: "email is invalid",
                },
                password: {
                    type: "String",
                    minLength: 6,
                    errorMessage: "password is invalid",
                    pattern: "^(?=.*[A-Z])(?=.*[0-9]).+$", // Le password doit contenir au moins une majuscule et 1 chiffre
                },
                role: {
                    type: "string",
                    enum: [Role.ADMIN, Role.USER],
                    errorMessage: "Role is invalid",
                },
            },
            required: ["firstname", "lastname", "email", "password"],
        };

        let result = validator.validate(user, userSchema);

        if (result.errors.length) {
            const errorInputsMsg = result.errors
                .map((error) => {
                    return error.schema.errorMessage || error.message;
                })
                .join(" ");

            throw new Error(errorInputsMsg);
        }
    },
};
