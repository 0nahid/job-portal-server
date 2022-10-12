import mongoose from "mongoose";
import availableJobsSchema from "../Schema/availableJobsSchema";

export const availableJobs = mongoose.model("AvailableJobs", availableJobsSchema);