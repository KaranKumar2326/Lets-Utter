// import mongoose  from "mongoose";
const mongoose  = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true

        })
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB