const Book = require("../../models/books");

  async function deleteBook(req,res) {
    const {id}=req.params;
    try{
        const book=await Book.deleteOne({ _id :id});
        if (!book) {
          return res.status(404).json({ message: "Book not found" });
      }
        res.status(200).json({
            message : "book deleted successfully !!!"
        })
    }catch (err){
        res.status(400).json({
          message: err
        })
    }
}


module.exports=deleteBook;