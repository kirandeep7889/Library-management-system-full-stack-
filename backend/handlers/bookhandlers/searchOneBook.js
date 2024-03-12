const Book = require("../../models/books");

 async function searchOneBook(req,res) {
    const { query } = req.query;

    try {
        let searchResults;

        if (!query || query.trim() === '') {
            searchResults = [];
        } else {
            searchResults = await Book.find({
                $or: [
                    { title: { $regex: query, $options: 'i' } },
                    { author: { $regex: query, $options: 'i' } }
                ]
            });

            if (searchResults.length === 0) {
                searchResults = [];
            }
        }

        res.json(searchResults);
    } catch (error) {
        console.error('Error searching books:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

module.exports=searchOneBook;