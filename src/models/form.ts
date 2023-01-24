import { Schema, model} from 'mongoose';

const formSchema = new Schema({
    id: {
        type: String, 
        unique: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    state: {
        type: String
    }
    });

export default model('Form', formSchema);