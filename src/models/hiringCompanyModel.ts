import mongoose from "mongoose";
import highringCompanySchema from "../Schema/hiringCompanySchema";

export const highringCompanyModel = mongoose.model(
  "HiringCompany",
  highringCompanySchema
);
