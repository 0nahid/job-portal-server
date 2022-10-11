import mongoose from "mongoose";
import UserSchema from "../Schema/userSchema";

export const User = mongoose.model("User", UserSchema);
