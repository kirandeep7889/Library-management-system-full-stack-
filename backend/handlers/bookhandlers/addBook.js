const Book = require("../../models/books");
const zod = require("zod");

const addBookData = zod.object({
    title : zod.string(),
    author: zod.string(),
 })

async function addBook(req,res) {
    const { success } = addBookData.safeParse(req.body);
    if(!success){
       return res.status(411).json({
          message: "Book data is invalid"
      })
    }
    console.log("hi")
    try{
        const book= await Book.create({
            title: req.body.title,
            author: req.body.author
        });
        res.status(200).json(book)
    } catch (err) {
            res.status(400).json({
                message : err
            })
    }
}

module.exports=addBook;