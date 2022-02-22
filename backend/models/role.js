import mongoose from 'mongoose';

//Se creó el esquema o tabla de rol
const roleSchema = new mongoose.Schema({
    name:String,
    description:String,
    registerDate:{type: Date, default:Date.now},
    dbStatus:Boolean
});

//Se crea el modelo/coleccion
const role = mongoose.model("roles", roleSchema);

export default role;