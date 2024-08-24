import mongoose, { Schema, Document, Model, model, ObjectId } from "mongoose";
import { hashSync, genSaltSync } from "bcryptjs";

// Define the IUser interface with Document from Mongoose
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  status: string;
  date: Date;
  encryptPassword: (password: string) => string;
}

// Define the IUserModel interface for the Mongoose model
interface IUserModel extends Model<IUser> {
  findUserDataByEmail: (email: string) => Promise<IUser[]>;
}

// Create the User schema
const UserSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user', // Set a default role
  },
  status: {
    type: String,
    default: 'active', // Set a default status
  },
  date: {
    type: Date,
    default: Date.now, // Set a default date to now
  },
});

// Add methods to the schema
UserSchema.methods.encryptPassword = function(password: string): string {
  return hashSync(password, genSaltSync(10));
};

// Add static methods to the schema
UserSchema.statics.findUserDataByEmail = function(email: string): Promise<IUser[]> {
  return this.find({ email }).exec();
};

// Create the model from the schema
const User: IUserModel = model<IUser, IUserModel>("User", UserSchema);

export { IUser };
export default User;
