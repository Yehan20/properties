
import mongoose, { Schema, Document } from "mongoose";
import { PropertyInterface } from "../types";

// Design Schema
const PropertySchema = new Schema(
    {
        propetyTitle: {
            type: String,
            unique: true,
            required: true,
        },
        propetyImg: {
            type: String,
            required: true,
        },
        propetySlug: {
            type: String,
            unique: true,
            required: true,
        },
        propetyLocation: {
            type: String,
            enum: ["Colombo", "Kandy", "Galle"], // Restrict to predefined locations
            required: true,
        },
        propetyDescription: {
            type: String,
            required: true,
        },
        propetyPrice: {
            type: Number,
            required: true,
        },
        propetyType: {
            type: String,
            enum: ["Single Family", "Villa"], // Restrict to predefined types
            required: true,
        },
        propetyStatus: {
            type: String,
            enum: ["For Sale", "For Rent"], // Restrict to predefined statuses
            required: true,
        },
        propetyArea: {
            type: Number,
            required: true,
        },
        propetyInStock: {
            type: Boolean,
            default: true,
        },
    },  { timestamps: true }
);

export default mongoose.model<PropertyInterface>("Property", PropertySchema);


