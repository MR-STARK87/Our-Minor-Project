import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/dbConnection.js";
import healthCheckRoute from "./routes/healthCheckRoute.js";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";
import cookieParser from "cookie-parser";

// Load environment variables FIRST
dotenv.config({ debug: false });

const app = express();

app.use(cookieParser());
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World from Express.js");
});

app.get("/check", (req, res) => {
  res.send("<h1>Check Route</h1>");
});

app.use("/api/v1/health", healthCheckRoute);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/notes", noteRoutes);
app.use("/api/v1", chatRoutes);
app.use("/api/v1/cards", cardRoutes);

// Connect to MongoDB and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });
