require("dotenv").config();
const connectDB = require("./config/db")
const app = require("./app")
const redisClient = require("./config/redis");

const PORT = process.env.PORT || 5000;

async function startServer() {

    // MongoDB (Critical)
    try {

        console.log(process.env.MONGO_URI);

        await connectDB();

        console.log("MongoDB Connected");

    } catch (error) {

        console.error("MongoDB Connection Failed");
        console.error(error.message);

        process.exit(1);

    }

    // Redis (Optional)
    try {

        await redisClient.connect();


        console.log("Redis Connected");

        await redisClient.set("name", "Aditya");

        const value = await redisClient.get("name");

        console.log(value);

    } catch (error) {

        console.log("Redis is unavailable. Continuing without cache.");

    }

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

}

startServer();