const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectdb = require("./config/dbconnections");
const app = express();

const port = process.env.PORT || 5000;
//const url="mongodb+srv://hvhruday100:Vishal2002@mycontacts-backend.ywawgli.mongodb.net/";
connectdb();
app.use(express.json()); 
app.use("/api/contacts",require("./rotues/contactRoute"));
app.use("/api/users",require("./rotues/userRoute"));

app.use(errorHandler);
 
app.listen(port,()=>
{
    console.log(`app is running on the ${port}`); 
});