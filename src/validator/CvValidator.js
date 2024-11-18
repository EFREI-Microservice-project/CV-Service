const { Validator } = require("jsonschema");

module.exports = {
    verifyCv: (cv) => {
        if (!cv) {
            throw new Error("CV Information not provided");
        }
        let validator = new Validator();
        let cvSchema = {
            type: "object",
            properties: {
                user: {
                    type: "string",
                    pattern: "^[0-9a-fA-F]{24}$",
                    errorMessage: "User ID is invalid",
                },
            },
            required: ["user"],
        };

        let result = validator.validate(cv, cvSchema);

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
