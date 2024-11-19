const mongoose = require("mongoose");

const CvSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },

    review: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],

    title: {
        type: String,
        required: true,
    },

    education: [
        {
            school: String,
            formation: String,
            description: String,
            startDate: Number,
            endDate: Number,
        },
    ],

    experience: [
        {
            company: String,
            position: String,
            startDate: Number,
            endDate: Number,
        },
    ],

    biography: {
        type: String,
        required: true,
    },

    skills: [String],

    softSkills: [String],

    telephone: {
        type: String,
        required: true,
    },

    linkedin: {
        type: String,
        required: true,
    },

    private: {
        type: Boolean,
        default: true,
    },

    language: [String],
});

module.exports = mongoose.model("Cv", CvSchema);
