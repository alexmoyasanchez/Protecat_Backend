import { Schema, model} from 'mongoose';

const taskSchema = new Schema({
    id: {
        type: String, 
        unique: true
    },
    date: {
        type: Date
    },
    subject: {
        type: String
    },
    description:{
        type: String
    },
    done:{
        type: Boolean
    },
    volunteer: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]


    });

export default model('Task', taskSchema);
