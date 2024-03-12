const Book = require("../../models/books");

 async function borrowBook(req,res) {
    const {id}=req.params;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        if (!book.available) {
            return res.status(400).json({
                message: 'Book is already borrowed'
            })
        }

        book.available = false;
        await book.save();
        res.status(200).json({
            message : "book borrowed successfully"
        });
    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports=borrowBook;