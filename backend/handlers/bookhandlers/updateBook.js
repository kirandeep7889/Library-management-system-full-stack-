const Book = require("../../models/books");
const zod = require("zod");


const updateBookData = zod.object({
      title : zod.string(),
      author: zod.string(),
   })

  async function updateBook(req,res) {
      const { success } = updateBookData.safeParse(req.body);
      if(!success){
         return res.status(411).json({
            message: "Book data you want to update is incorrect/invalid"
        })
      }
        const changes=req.body;
        const {id}=req.params;
        try{
           const changedBook=await Book.findByIdAndUpdate(id,changes)
           if(!changedBook){
               return res.status(404).send('Book not found');
           }
           res.status(200).json({
            message : "Book updated successfully"
           })
        } catch (err) {
              res.status(400).send(err);
        }
}


module.exports=updateBook;