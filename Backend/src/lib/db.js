import mongoose from "mongoose";

import dns from "node:dns";

dns.setServers(["8.8.8.8","8.8.4.4"]);

export async function connectDB() {
    try{
        const mongoUri = process.env.MONGO_URI;

        if(!mongoUri){
            throw new Error("MONGO_URI is required");
        }

        const conn = await mongoose.connect(mongoUri);

        console.log("MongoBD connected",conn.connection.host);
    } catch(error) {
        console.error("MongoBD connection error:", error.message);
        process.exit(1);  // 1 means failure , 0 means success
    }
}