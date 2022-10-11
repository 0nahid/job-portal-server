import { Schema } from "mongoose";

const jobSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please enter job title"],
    trim: true,
    maxLength: [100, "Job title cannot exceed 100 characters"],
    minLength: [3, "Job title cannot be less than 3 characters"],
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  jobype: {
    type: String,
    required: true,
    enum: {
      values: ["full-time", "part-time", "contract"],
    },
    location: {
      type: String,
      required: true,
      enum: {
        values: ["remote", "on-site"],
        message:
          "Please select the correct location for job, it must be either remote or on-site",
      },
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["open", "closed"],
        message:
          "Please select the correct status for job, it must be either open or closed",
      },
    },
  },
},{
  timestamps: true
});
export default jobSchema;
