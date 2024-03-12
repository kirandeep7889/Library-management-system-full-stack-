// Function to display an alert message
function showAlert(message, type = 'info', target) {
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `<i class="fas fa-${getIcon(type)}"></i> ${message}`; 
    target.appendChild(alertDiv);
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Function to get the icon name based on the alert type
function getIcon(type) {
    switch (type) {
        case 'info':
            return 'info-circle';
        case 'warning':
            return 'exclamation-triangle';
        case 'success':
            return 'check-circle';
        case 'danger':
            return 'times-circle';
        default:
            return 'info-circle';
    }
}

// Display all books
let currentPage = 1;
const booksPerPage = 8;

// Function to display books for the current page
async function displayBooks(page) {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    try {
        const res = await axios.get(`http://localhost:3000/api/v1/books?page=${page}&limit=${booksPerPage}`);
        const data = res.data;
        console.log(data);
        const books = data.books; 

        for (let i = books.length - 1; i >= 0; i--) {
            const book = books[i];
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.available ? "AVAILABLE" : "NOT AVAILABLE"}</td>
                <td></td>
            `;

            const buttonCell = row.querySelector('td:last-child');

            // Borrow/Return Button
            const borrowReturnButton = document.createElement("button");
            borrowReturnButton.textContent = book.available ? "Borrow" : "Return";
            borrowReturnButton.onclick = () => {
                book.available ? borrowBook(book._id) : returnBook(book._id) ;
            };
            borrowReturnButton.classList.add(book.available ? 'borrowButton' : 'returnButton');
            buttonCell.appendChild(borrowReturnButton);

            // Edit icon with onclick functionality
            const editIcon = document.createElement("i");
            editIcon.classList.add('fas');
            editIcon.classList.add('fa-edit');
            editIcon.style.cursor = 'pointer'; 
            editIcon.onclick = () => editBook(book._id);
            buttonCell.appendChild(editIcon);       

            // Delete icon with onclick functionality
            const deleteIcon = document.createElement("i");
            deleteIcon.classList.add('fas');
            deleteIcon.classList.add('fa-trash-alt');
            deleteIcon.style.cursor = 'pointer'; 
            deleteIcon.onclick = () => deleteBook(book._id);
            buttonCell.appendChild(deleteIcon); 

            bookList.prepend(row); 
        };
    } catch (error) {
        console.error('Error displaying books:', error);
    }
}

function nextPage() {
    currentPage++;
    displayBooks(currentPage);
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayBooks(currentPage);
    }
}

displayBooks(currentPage);
       
// Function to handle book deletion
async function deleteBook(bookId) {
    try {
        const res = await axios.delete(`http://localhost:3000/api/v1/books/${bookId}`);
        console.log(res);
        showAlert('Book deleted successfully.', 'success', document.getElementById("alertArea"));
        displayBooks();
    } catch (error) {
        console.error('Error deleting book:', error);
    }
}

// ADD NEW BOOK FUNCTION
document.getElementById('addBookForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const title = formData.get('title');
    const author = formData.get('author');

    if (!title || !author) {
        showAlert('Please fill in all fields.', 'danger', document.getElementById("addBookAlertArea"));
        return;
    }

    const newBook = {
        title: title,
        author: author,
        available: true 
    };
    try {
        const res = await axios.post('http://localhost:3000/api/v1/books', newBook);
        const createdBook = res.data; 
        this.reset();
        prependBook(createdBook); 
        showAlert('Book added successfully.', 'success', document.getElementById("alertArea"));
    } catch (error) {
        console.error('Error adding book:', error);
        showAlert('Failed to add book. Please try again later.', 'danger', document.getElementById("alertArea"));
    }
});

function prependBook(book) {
    const bookList = document.getElementById("bookList");
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.available ? "AVAILABLE" : "NOT AVAILABLE"}</td>
        <td></td>
    `;
    
    const buttonCell = row.querySelector('td:last-child');

    // Borrow/Return Button
    const borrowReturnButton = document.createElement("button");
    borrowReturnButton.textContent = book.available ? "Borrow" : "Return";
    borrowReturnButton.onclick = () => {
        book.available ? borrowBook(book._id) : returnBook(book._id) ;
    };
    borrowReturnButton.classList.add(book.available ? 'borrowButton' : 'returnButton');
    buttonCell.appendChild(borrowReturnButton);

    // Edit icon with onclick functionality
    const editIcon = document.createElement("i");
    editIcon.classList.add('fas');
    editIcon.classList.add('fa-edit');
    editIcon.style.cursor = 'pointer'; 
    editIcon.onclick = () => editBook(book._id);
    buttonCell.appendChild(editIcon);       

    // Delete icon with onclick functionality
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add('fas');
    deleteIcon.classList.add('fa-trash-alt');
    deleteIcon.style.cursor = 'pointer'; 
    deleteIcon.onclick = () => deleteBook(book._id);
    buttonCell.appendChild(deleteIcon); 

    bookList.prepend(row); 
}

// Function to handle borrowing a book
async function borrowBook(id) {
    try {
        await axios.post(`http://localhost:3000/api/v1/user/borrow/${id}`);
        displayBooks();
        showAlert('You have successfully borrowed the book.', 'success', document.getElementById("borrowReturnAlertArea"));
    } catch (error) {
        console.error('Error borrowing book:', error);
        showAlert("Failed to borrow the book. Please try again later.", 'danger', document.getElementById("borrowReturnAlertArea"));
    }
}

// Function to handle returning a book
async function returnBook(id) {
    try {
        await axios.post(`http://localhost:3000/api/v1/user/return/${id}`);
        displayBooks();
        showAlert('You have successfully returned the book.', 'success', document.getElementById("borrowReturnAlertArea"));
    } catch (error) {
        console.error('Error returning book:', error);
        showAlert("Failed to return the book. Please try again later.", 'danger', document.getElementById("borrowReturnAlertArea"));
    }
}

// Function to handle searching books
async function searchBooks(query) {
    try {
        const res = await axios.get(`http://localhost:3000/api/v1/books/search?query=${query}`);
        const searchResults = res.data;
        displaySearchResults(searchResults);
    } catch (error) {
        console.error('Error searching books:', error);
        showAlert('Failed to search books. Please try again later.', 'danger', document.getElementById("searchAlertArea"));
    }
}

// Function to display search results
function displaySearchResults(results) {
    const searchResultsList = document.getElementById("searchResults");
    searchResultsList.innerHTML = "";

    if (results.length === 0) {
        const listItem = document.createElement("li");
        listItem.textContent = 'No results found';
        searchResultsList.appendChild(listItem);
    } else {
        results.forEach(book => {
            const listItem = document.createElement("li");
            listItem.textContent = `${book.title} by ${book.author}`;
            searchResultsList.appendChild(listItem);
        });
    }
}

// Search Book Logic
document.getElementById("searchBookForm").addEventListener('submit', function(event) {
    event.preventDefault();
    const searchInput = document.getElementById("searchInput").value;
    searchBooks(searchInput);
});


// Function to open the edit book dialog and populate form fields with current book details
function editBook(id) {
    const editBookDialog = document.getElementById('editBookDialog');
    const closeBtn = editBookDialog.querySelector('.close');
    const editBookForm = document.getElementById('editBookForm');
    const titleInput = document.getElementById('editTitle');
    const authorInput = document.getElementById('editAuthor');

    axios.get(`http://localhost:3000/api/v1/books/${id}`)
        .then(response => {
            const book = response.data;
            titleInput.value = book.title;
            authorInput.value = book.author;

            // Show the edit book dialog
            editBookDialog.style.display = 'block'; 

            closeBtn.onclick = function() {
                editBookDialog.style.display = 'none'; 
            };

            // Update book details when form is submitted
            editBookForm.onsubmit = function(event) {
                event.preventDefault();
                const updatedBook = {
                    title: titleInput.value,
                    author: authorInput.value
                };
                axios.put(`http://localhost:3000/api/v1/books/${id}`, updatedBook)
                    .then(() => {
                        showAlert('Book updated successfully.', 'success', document.getElementById("alertArea"));
                        editBookDialog.style.display = 'none'; 
                        displayBooks(currentPage);
                    })
                    .catch(error => {
                        console.error('Error updating book:', error);
                        showAlert('Failed to update book. Please try again later.', 'danger', document.getElementById("alertArea"));
                    });
            };
        })
        .catch(error => {
            console.error('Error fetching book details:', error);
        });
}
