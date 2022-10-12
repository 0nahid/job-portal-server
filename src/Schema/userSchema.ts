import bcrypt from "bcrypt";
import { Schema } from "mongoose";
import PasswordValidator from "password-validator";
import validator from "validator";
const ObjectId = Schema.Types.ObjectId;

const passwordSchema = new PasswordValidator()
  .min(8)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces();
export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  image: string;
  status: string;
  confirmationToken: string;
  confirmationTokenExpires: Date | string;
  passWordChangedAt: Date;
  passWordResetToken: string;
  passWordResetExpires: Date;
  _doc: any;
}

const UserSchema = new Schema<IUser>({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    maxLength: [20, "Username cannot exceed 20 characters"],
    minLength: [3, "Username cannot be less than 3 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (password: string) => passwordSchema.validate(password),
      message: (props: any) => `${props.value} is not a valid password!`,
    },
  },
  // comparePassword: {
  //   type: String,
  //   required: true,
  //   trim: true,
  //   validate: {
  //     validator: function (this: IUser, candidatePassword: string) {
  //       return bcrypt.compare(candidatePassword, this.password);
  //     },
  //   },
  // },
  role: {
    type: String,
    enum: ["candidate", "admin", "hr"],
    default: "candidate",
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: [20, "First name cannot exceed 20 characters"],
    minLength: [3, "First name cannot be less than 3 characters"],
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: [20, "Last name cannot exceed 20 characters"],
    minLength: [3, "Last name cannot be less than 3 characters"],
  },
  phone: {
    type: String,
    required: true,
    validate: [validator.isMobilePhone, "Please enter a valid phone number"],
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    validate: [validator.isURL, "Please enter a valid URL"],
    default: "https://via.placeholder.com/150",
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  confirmationToken: String,
  confirmationTokenExpires: Date,
  passWordChangedAt: Date,
  passWordResetToken: String,
  passWordResetExpires: Date,
});



export default UserSchema;
