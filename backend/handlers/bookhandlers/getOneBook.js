const Book = require("../../models/books");

 async function getOneBook(req,res) {
      const {id}=req.params;
      try{
          const book=await Book.findOne({ _id :id});
          if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
          res.status(200).send(book)
      }catch (err){
          res.status(400).json({
            message: err
          })
      }

}

module.exports=getOneBook;