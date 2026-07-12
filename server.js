require("dotenv").config();
const connectDB = require("./config/db")
const app = require("./app")

const PORT = process.env.PORT || 5000;

async function startServer(){

    try{
        console.log(process.env.MONGO_URI);
        await connectDB();

        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error){

        console.error("Failed to start application");
        console.error(error.message);

        process.exit(1);
    }
}

startServer();