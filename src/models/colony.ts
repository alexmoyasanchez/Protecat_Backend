import { Schema, model} from 'mongoose';

const colonySchema = new Schema({
    id: {
        type: String, 
        unique: true
    },
    name: {
        type: String
    },
    locationx: {
        type: String
    },
    locationy: {
        type: String
    },
    observations:{
        type: String
    },
    cats: [{
        type: Schema.Types.ObjectId,
        ref: 'Cat'
    }]
    });

export default model('Colony', colonySchema);