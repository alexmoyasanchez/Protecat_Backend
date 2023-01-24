import { Schema, model} from 'mongoose';

const objectSchema = new Schema({
    id: {
        type: String, 
        unique: true
    },
    name: {
        type: String
    },
    imageUrl: {
        type: String
    },
    price:{
        type: Number
    },
    description: {
        type: String
    },
    units: {
        type: Number
    }
    


    });

export default model('Object', objectSchema);
