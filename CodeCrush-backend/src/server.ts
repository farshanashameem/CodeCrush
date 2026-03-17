import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";

import { connectDB } from "./infrastructure/database/mongo.connection";
import authRoutes from "./presentation/routes/authRoutes";
import childRoutes from "./presentation/routes/childRoutes";
import AdminRoutes from "./presentation/routes/AdminRoutes"

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

/* SESSION MIDDLEWARE */
app.use(
  session({
    secret: "codecrushsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true only in HTTPS
      httpOnly: true,
      maxAge: 10 * 60 * 1000, // 10 minutes
    },
  })
);

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/children", childRoutes);
app.use("/api/admin", AdminRoutes);

connectDB();

app.get("/", (req, res) => {
  res.send("Code Crush Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});