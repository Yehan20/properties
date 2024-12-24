
import mongoose, { Schema, Document } from "mongoose";
import { PropertyInterface } from "../types";

// Design Schema
const PropertySchema = new Schema(
    {
        propertyTitle: {
            type: String,
            unique: true,
            required: true,
        },
        propertyImg: {
            type: String,
            required: true,
        },
        propertySlug: {
            type: String,
            unique: true,
            required: true,
        },
        propertyLocation: {
            type: String,
            enum: ["colombo", "kandy", "galle"], // 3 locations
            required: true,
        },
        propertyDescription: {
            type: String,
            required: true,
        },
        propertyPrice: {
            type: Number,
            required: true,
        },
        propertyType: {
            type: String,
            enum: ["single family", "villa"], // 2 types
            required: true,
        },
        propertyStatus: {
            type: String,
            enum: ["for sale", "for rent"], // 2  status
            required: true,
        },
        propertyArea: {
            type: Number,
            required: true,
        },
        propertyInStock: {
            type: Boolean,
            default: true,
        },
    },  { timestamps: true }
);



export default mongoose.model<PropertyInterface>("Property", PropertySchema);


