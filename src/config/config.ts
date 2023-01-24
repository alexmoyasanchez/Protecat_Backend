export const SECRET = process.env.MONGODB_PASSWORD;

export default {
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb+srv://dbUser:dbUserPassword@cluster0.dzg6qgo.mongodb.net/test',
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD,
        },
        
    CADUCIDAD_TOKEN : process.env.CADUCIDAD_TOKEN = '48h',
    SEED_AUTENTICACION : process.env.SEED_AUTENTICACION = process.env.SEED_AUTENTICACION ||  'este-es-el-seed-desarrollo',
    
}