import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);

import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already Database connection");
    return;
  }

  try {
    const uri = process.env.MONGO_URI!;
    
    if (!uri) {
      throw new Error("MongoDB connection string is not set. Please set MONGO_URL or MONGODB_URI in environment variables.");
    }

    const db = await mongoose.connect(uri);
    connection.isConnected = db.connections[0].readyState;
    console.log("Database Connected Successfully");
    console.log("Connection state:", db.connections[0].readyState);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Database Connection Failed:", errorMessage);
    throw error;
  }
}
export default dbConnect;
