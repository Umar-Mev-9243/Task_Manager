import mongoose from "mongoose";
import dns from "node:dns";

dns.setServers(["8.8.8.8"]);

const MongodbConnection = async (url) => {
    try {
        await mongoose.connect(url);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        throw error;
    }
};

export default MongodbConnection;