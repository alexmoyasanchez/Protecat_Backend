import { Schema, model} from 'mongoose';

const requestSchema = new Schema({
    id: {
        type: String, 
        unique: true
    },
    cat: {
        type: Schema.Types.ObjectId,
        ref: 'Cat'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    state: {
        type: String
    },
    validation: {
        type: String
    }


    });

export default model('Request', requestSchema);
