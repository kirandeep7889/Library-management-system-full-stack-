const express=require("express");
const getAllBooksData = require("../handlers/bookhandlers/getAllBooks");
const addBook = require("../handlers/bookhandlers/addBook");
const  getOneBook  = require("../handlers/bookhandlers/getOneBook");
const  updateBook  = require("../handlers/bookhandlers/updateBook");
const  deleteBook  = require("../handlers/bookhandlers/deleteBook");
const searchOneBook = require("../handlers/bookhandlers/searchOneBook");
const bookRoutes=express.Router();

//all routes
bookRoutes.get("/search",searchOneBook); 
bookRoutes.get("/",getAllBooksData);
bookRoutes.get("/:id",getOneBook);
bookRoutes.post("/", addBook);
bookRoutes.put("/:id" ,updateBook);
bookRoutes.delete("/:id" , deleteBook);


module.exports=bookRoutes