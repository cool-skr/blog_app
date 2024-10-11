import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

export const ConnectDb = async () => {
    try {
        const connectionPromise = mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'blog-app',
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000 
        });
        await connectionPromise;
        console.log("DB Connected");
    } catch (error) {
        console.error("DB connection failed:", error.message);
    }
}
