import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
enum Sexe {
  MALE,
  FEMELLE,
}
export interface IUser {
  name: string;
  email: string;
  dob: Date;
  sexe: Sexe;
  password: string;
}
export interface IUserModel extends IUser, Document {}
const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },

    dob: { type: Date, required: true },
    sexe: { type: String, required: true, enum: ["MALE", "FEMELLE"] },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);
UserSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});
UserSchema.methods.isValidPassword = async function (password: string) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw createHttpError.InternalServerError(error.message);
  }
};
export default mongoose.model<IUserModel>("users", UserSchema);
