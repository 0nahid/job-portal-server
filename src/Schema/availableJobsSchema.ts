import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId;

const availableJobsSchema = new Schema(
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
    hiringCompany: {
      id: {
        type: ObjectId,
        ref: "HiringCompany",
      },
    },
    hiringManager: {
      id: {
        type: ObjectId,
        ref: "User",
      },
    },
    jobType: {
      type: String,
      required: true,
      enum: {
        values: ["full-time", "part-time", "contract", "internship"],
      },
    },
    aboutJob: {
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
        // required: true,
        enum: {
          values: ["open", "closed"],
          message:
            "Please select the correct status for job, it must be either open or closed",
        },
        default: "open",
      },
    },
    skills: {
      type: [String],
      required: true,
    },
    salary: {
      type: String,
    },
    ctcSalary: {
      type: String,
    },
    experience: {
      type: [String],
    },
    education: {
      type: [String],
    },
    vacancies: {
      type: Number,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    perks: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

export default availableJobsSchema;
