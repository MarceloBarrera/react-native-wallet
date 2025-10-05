import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js";
import job from "./config/cron.js";
dotenv.config();

const app = express();
app.use(rateLimiter);
app.use(express.json());
// specify the origins you want to allow here
app.use(
  cors({
    origin: ["https://your-frontend-domain.com", "http://localhost:8081"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

if (process.env.NODE_ENV === "production") {
  job.start();
}

const PORT = process.env.PORT || 5001;

app.get("/api/health", (req, res) => {
  res.status(200).send("API is healthy");
});

app.use("/api/transactions", transactionsRoute);

initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start the server:", error);
    process.exit(1);
  });
