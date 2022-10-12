import { Schema } from "mongoose";
import validator from "validator";
const ObjectId = Schema.Types.ObjectId;

const highringCompanySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: [100, "Company name cannot exceed 100 characters"],
    minLength: [3, "Company name cannot be less than 3 characters"],
    unique: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
    validate: [validator.isURL, "Please enter a valid URL"],
  },
  logo: {
    type: String,
    required: true,
    validate: [validator.isURL, "Please enter a valid URL"],
    default: "https://via.placeholder.com/150",
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  phone: {
    type: String,
    required: true,
    validate: [validator.isMobilePhone, "Please enter a valid phone number"],
  },
  hiringManager: {
    id: {
      type: ObjectId,
      ref: "User",
    },
  },
  jobs: [
    {
      type: ObjectId,
      ref: "Job",
    },
  ],
  availableJobs: [
    {
      type: ObjectId,
      ref: "AvailableJobs",
    },
  ],
});

export default highringCompanySchema;
