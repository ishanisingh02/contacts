const express=require("express");
const connectDb=require("./config/dbConnection");
const dotenv=require("dotenv").config();
const errorHandler=require("./middleware/errorHandler")
const app=express();

connectDb();
const port=process.env.PORT || 5000;

app.use(express.json());//this middleware allows us to parse json files

app.use("/api/contacts",require("./routes/contactRoutes"));//middleware
//using middleware to send routes

app.use("/api/users",require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})