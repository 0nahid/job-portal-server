import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId;

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter job title"],
      trim: true,
      maxLength: [100, "Job title cannot exceed 100 characters"],
      minLength: [3, "Job title cannot be less than 3 characters"],
    },
    description: {
      type: [String],
      required: true,
    },
    jobType: {
      type: String,
      required: true,
      enum: {
        values: ["full-time", "part-time", "contract","internship"],
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
        default: "open",
      },
    },
    hiringCompany: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Company",
      },
    },
    hiringManager: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "User",
      },
    },
  },
  {
    timestamps: true,
  }
);
export default jobSchema;
