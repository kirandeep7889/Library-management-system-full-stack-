const Book = require("../../models/books");

 async function getAllBooksData(req,res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        // Get total count of books from database (this is required for pagination)
        const totalCount = await Book.countDocuments();

        const books = await Book.find().limit(limit).skip(startIndex).exec();

        const results = {
            totalCount: totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
            books: books
        };

        res.json(results);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

module.exports=getAllBooksData;