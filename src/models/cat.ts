import { Schema, model} from 'mongoose';

const catSchema = new Schema({
    id: {
        type: String, 
        unique: true
    },
    name: {
        type: String
    },
    sex: {
        type: String
    },
    weight: {
        type: String
    },
    compatibilities:{
        type: String
    },
    incompatibilities:{
        type: String
    },
    diseases:{
        type: String
    },
    imageUrl:{
        type: String
    },
    colony:[{
        type: Schema.Types.ObjectId, 
        ref: 'Colony'
    }]


    });

export default model('Cat', catSchema);