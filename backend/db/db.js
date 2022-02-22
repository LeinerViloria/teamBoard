//Esto va a realizar la conexion con MongoDb
import mongoose from 'mongoose';

const dbConnection = async () =>{
    try {
        await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology:true,
        });
        console.log("Connection with mongoDB OK");
    } catch (error) {
        console.log("Connection with mongoDB Error: ", error);
    }
}

export default {dbConnection};