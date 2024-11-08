import mongoose from 'mongoose';

let isConnected = false; 

export async function connect() {
    if (isConnected) return; 

    try {
        await mongoose.connect(process.env.MONGODB_URL!);
        isConnected = true; 
        console.log("Connected to DB");
        
    } catch (error) {
        console.error("Database connection error:", error);
        throw new Error("Could not connect to the database.");
    }
}
