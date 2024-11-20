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
                title: {
                    type: "string",
                    minLength: 1,
                    errorMessage: "Title is required",
                },
                education: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            school: { type: "string" },
                            formation: { type: "string" },
                            description: { type: "string" },
                            startDate: { type: "number" },
                            endDate: { type: "number" },
                        },
                    },
                },
                experience: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            compagny: { type: "string" },
                            position: { type: "string" },
                            startDate: { type: "number" },
                            endDate: { type: "number" },
                        },
                    },
                },
                biography: {
                    type: "string",
                    minLength: 1,
                    errorMessage: "Biography is required",
                },
                skills: {
                    type: "array",
                    items: { type: "string" },
                },
                softSkills: {
                    type: "array",
                    items: { type: "string" },
                },
                telephone: {
                    type: "string",
                    errorMessage: "Telephone number is required",
                },
                linkedin: {
                    type: "string",
                    format: "uri",
                    errorMessage: "LinkedIn URL is invalid",
                },
                private: {
                    type: "boolean",
                },

                language: {
                    type: "array",
                    items: { type: "string" },
                },
            },
            required: ["title", "biography", "telephone", "linkedin", "skills", "softSkills", "language"],
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
