import express from "express" ;
import dotenv from "dotenv";
import { connectDB } from "./infrastructure/database/mongo.connection";
import authRoutes from "./presentation/routes/authRoutes"
dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);

connectDB();

app.get('/' , (req,res) => {
    res.send("Code Crush Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});