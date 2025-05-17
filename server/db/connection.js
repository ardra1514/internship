import dotenv from 'dotenv';     
dotenv.config();                 
import mongoose from "mongoose";


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connection created");
    } catch(error) {
        console.error("connection failed");
        console.log("MONGO_URL:", process.env.MONGO_URL); 
        process.exit(1);
    }
    
};
export default connectDB;
