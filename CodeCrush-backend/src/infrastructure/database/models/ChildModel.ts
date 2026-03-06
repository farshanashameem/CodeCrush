import mongoose from "mongoose";

const childGameSchema = new mongoose.Schema ({
    gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
        required: true
    },

    currentLevel: {
        type: Number,
        default:1
    },

    currentLevelHighScore: {
        type: Number,
        default: 0
    },

    averageScore: {
        type: Number,
        default: 0
    },

    lastPlayedAt: {
        type: Date
    }
})

const childSchema = new mongoose.Schema ({

    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Parent",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    avatar: {
        type: String,
        required: true
    },

    isBlocked: {
        type: Boolean,
        default: false
    },

    totalPlayTime: {
        type: Number,
        default: 0
    },

    totalGamesPlayed: {
        type: Number,
        default: 0
    },

    lastPlayed: {
        type: Date
    },

    games: {
        type: [childGameSchema],
        default: []
    }

}, {timestamps: true});

export const ChildModel = mongoose.model("Child", childSchema);