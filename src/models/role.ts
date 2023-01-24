import mongoose, {Schema, model} from "mongoose";
export const ROLES = ["user", "admin"];


export interface IRole extends Document{
    name: string;
    versionKey?: boolean;
  }

const roleSchema = new Schema(
    {
        name: String,
    },
    {
        versionKey: false,
    }
);


export default mongoose.model<IRole>("Role", roleSchema);