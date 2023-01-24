import { Schema, model} from 'mongoose';

const postSchema = new Schema({
    id:{
        type: String, 
        unique: true
    },
    
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String
    },
    imageUrl:{
        type: String
    },
    date:{
        type: String
    },

    likes:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
    });

export default model('Post', postSchema);