import mongoose from "mongoose";

const ParentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isBlocked: {
        type: Boolean,
        default:false
    },
    isDeleted: {
        type: Boolean,
        default:false
    },
    childrenIds: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Children"
    }]
},
{ timestamps: true}
);

export const ParentModel = mongoose.model("Parent", ParentSchema);