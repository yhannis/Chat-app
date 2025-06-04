

import mongoose from 'mongoose';


export const connectDB = async () => {

    try{

       const conn = await mongoose.connect(process.env.MONGODB_URI);
       console.log(`Mongo db connected successfully. Host: ${conn.connection.host}`);

    } catch (e) {

        console.log("MongoDB connection error: ", e);
    }
}