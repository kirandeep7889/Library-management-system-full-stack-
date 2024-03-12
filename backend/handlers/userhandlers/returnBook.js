const Book = require("../../models/books");

async function returnBook(req,res) {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }
        book.available = true;
        await book.save();
        res.status(200).json({
            message : "book returned successfully"
        });
    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports=returnBook;