import mongoose, { Schema, model} from 'mongoose';


const userSchema = new Schema({
    id: {
        type: String, 
        unique: true
    },
    username: {
        type: String, 
        unique: true
    },
    password: {
        type: String
    },
    email: {
        type: String, 
        unique: true
    },
    imageUrl:{
        type: String
    },
    roles:[{
        type: Schema.Types.ObjectId, 
        ref: 'Role'
    }],
    tasks:[{
        type: Schema.Types.ObjectId, 
        ref: 'Task'
    }]
    });

export interface IUser extends Document{
    id: string;
    username: string;
    password: string;
    email: string;
    imageUrl: string;
    roles: Schema.Types.ObjectId;
    tasks: Schema.Types.ObjectId;

}


export default mongoose.model<IUser>("User", userSchema);