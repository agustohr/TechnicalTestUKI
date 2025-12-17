require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const employeesRouter = require("./routes/employees");

const app = express();

const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:4200";
app.use(cors({ origin: corsOrigin  }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/employees", employeesRouter);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected:", MONGO_URI);

    app.listen(PORT, () => {
      console.log(`API running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
