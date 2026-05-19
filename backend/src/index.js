import dotenv from "dotenv";
dotenv.config();  // Load .env file at the very beginning

import express from "express";
import connectDB from "./database/config/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import adminRoutes from "./routes/admin.route.js";
import friendRoutes from "./routes/friend.route.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import path from "path";
import {app, server} from "./lib/socket.js"

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Middleware
app.use(cors({
    origin: function(origin, callback) {
        // Allow all origins in development (or specify allowed IPs if needed)
        callback(null, true);
    },
    credentials:true, 
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/messages/", messageRoutes);
app.use("/api/friends/", friendRoutes);

// Production build setup
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../../frontend/dist")));
    app.get("*",(req,res) => {
        res.sendFile(path.join(__dirname,"../../frontend","dist","index.html"));
    })
}

// Health check endpoint
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "Server is running", port: PORT });
});

// Start server with improved error handling
const startServer = async () => {
    try {
        // Connect to database
        await connectDB();
        console.log("✅ MongoDB Connected Successfully");

        // Start listening on port - listen on all interfaces (0.0.0.0)
        server.listen(PORT, "0.0.0.0", () => {
            console.log(`\n${'='.repeat(50)}`);
            console.log(`🚀 Chatty Server Started Successfully`);
            console.log(`${'='.repeat(50)}`);
            console.log(`📡 API Server running on: http://0.0.0.0:${PORT}`);
            console.log(`🔌 WebSocket running on: ws://0.0.0.0:${PORT}`);
            console.log(`🌐 Frontend: http://localhost:5173`);
            console.log(`✨ Accessible from other devices on your network`);
            console.log(`${'='.repeat(50)}\n`);
        });

    } catch (error) {
        console.error(`\n❌ Failed to start server:`);
        console.error(`Error: ${error.message}\n`);
        console.error(`Troubleshooting steps:`);
        console.error(`1. Check if MongoDB is running: mongod`);
        console.error(`2. Verify MONGO_URI in .env: ${process.env.MONGO_URI}`);
        console.error(`3. Check if port ${PORT} is in use`);
        console.error(`4. Ensure all environment variables are set\n`);
        process.exit(1);
    }
};

startServer();
