// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
// =====================================

// UI Constructor
function UI() {

}

// Add Book Function to UI
UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');
    // create tr Element
    const row = document.createElement('tr');

    row.innerHTML =
        `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a hred="#" class="delete">X</a></td>`;
    list.appendChild(row);
}

//Clear Fields Function
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Show Alert success and error
UI.prototype.showAlert = function (message, className) {
    // Create  div Element for Alert
    const div = document.createElement('div');

    // Add Class Name
    div.className = `alert ${className}`;

    // Add Text 
    div.appendChild(document.createTextNode(message));

    // ** Insert Alert to UI **
    // Get container Element
    const container = document.querySelector('.container');

    // Get form Element
    const form = document.querySelector('#book-form');

    container.insertBefore(div, form);

    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000)

}

// Delete Book prototype

UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}
// ====================================

// Local Storage Constructor
function Store() {
}

Store.prototype.getBooks = function () {
    let books;
    if (localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
}

Store.prototype.addBook = function (book) {
    const storage = new Store(book);
    const books = storage.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
}

Store.prototype.removeBook = function (isbn) {
    const books = storage.getBooks();

    books.forEach(function (book, index) {
        if (book.isbn === isbn) {
            books.splice(index, 1);
        }
    });
    localStorage.setItem('books', JSON.stringify(books));
    
}

Store.prototype.displayBooks = function () {
    const books = storage.getBooks();

    books.forEach(function (book) {
        const ui = new UI;

        ui.addBookToList(book);

    });
}

// ====================================

const storage = new Store();
document.addEventListener('DOMContentLoaded',storage.displayBooks);

// ** Event Listeners Add book **
document.getElementById('book-form').addEventListener('submit', function (e) {

    // Get value from form
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    // instantiate book
    const book = new Book(title, author, isbn);

    // instantiate UI
    const ui = new UI();

    // Validate Fields
    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please Fill fields !!!', 'error');
    } else {
        // Add Book To List
        ui.addBookToList(book);

        // Add to LS
        const storage = new Store(book);
        storage.addBook(book);

        // Show Alert Success
        ui.showAlert('Book Added', 'success');

        // clear Fields
        ui.clearFields();
    }

    e.preventDefault();
});

// Event Listener for delete book
document.getElementById('book-list').addEventListener('click', function (e) {

    // Instantiate UI
    const ui = new UI();
    // Delete Book ui
    ui.deleteBook(e.target);

    // Remove Book from local storage
    const storage = new Store();
    storage.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show Alert after delete book
    ui.showAlert('Book Deleted!', 'success');

    e.preventDefault();
});
