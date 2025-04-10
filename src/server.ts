import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app"; // Import the app from your existing file

// Load environment variables from .env file
dotenv.config();

// MongoDB connection directly in the server file
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Exit the process if DB connection fails
  }
};

// Set the port from environment variable or default to 5000
const port = process.env.PORT || 5000;

// Start the server
const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB

    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

// Start the server
startServer();
