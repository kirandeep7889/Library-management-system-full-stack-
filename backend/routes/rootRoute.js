const express=require("express");
const bookRoutes=require("../routes/bookRoutes")
const userRoutes=require("../routes/userRoutes")

const rootRoute=express.Router();

rootRoute.use("/books",bookRoutes);
rootRoute.use("/user",userRoutes);


module.exports= rootRoute



