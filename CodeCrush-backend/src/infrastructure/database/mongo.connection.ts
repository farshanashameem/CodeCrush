import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('Mongodb connected ✅ ');
    }catch (error) {
        console.log("MongoDB Connection Failed ❌");
        console.error(error);
        process.exit(1);
    }
}