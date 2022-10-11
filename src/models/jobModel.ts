import mongoose from "mongoose";
import jobSchema from "../Schema/jobSchema";
export const JobModel = mongoose.model("Job", jobSchema);
