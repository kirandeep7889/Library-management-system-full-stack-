const express=require("express");
const login = require("../handlers/userhandlers/login");
const Book = require("../models/books");
const borrowBook = require("../handlers/userhandlers/borrowBook");
const returnBook = require("../handlers/userhandlers/returnBook");
const signin = require("../handlers/userhandlers/signin");

const userRoutes=express.Router();

//signin and login route
userRoutes.post("/signin", signin );
userRoutes.post("/login", login);

//borrow and return book route
userRoutes.post('/borrow/:id', borrowBook);
userRoutes.post('/return/:id', returnBook);


module.exports=userRoutes