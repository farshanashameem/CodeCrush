import mongoose, { Schema, Document } from "mongoose";
import { Admin } from "../../../domain/entities/Admin";

export interface IAdminDocument extends Admin, Document{}

const AdminSchema = new Schema<IAdminDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

export const AdminModel = mongoose.model<IAdminDocument>("Admin", AdminSchema);