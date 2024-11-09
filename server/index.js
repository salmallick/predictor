import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";  // Make sure this file exists
import KPI from "./models/KPI.js";        // Make sure this file exists
import { kpis } from "./data/data.js";    // Make sure this file exists

/* CONFIGURATIONS */
dotenv.config();
const app = express();

// Middleware setup
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use("/kpi", kpiRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;

mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // Add data only one time or as needed
    // await mongoose.connection.db.dropDatabase();
    // KPI.insertMany(kpis);
    
  })
  .catch((error) => console.log(`${error} did not connect`));