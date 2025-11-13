import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Basic test route
app.get("/", (req, res) => {
    res.send("Your AI-bot website is running!");
});

// Example API route
app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from backend!" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
