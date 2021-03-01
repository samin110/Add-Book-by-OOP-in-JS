//* * Write Code for ES6**

// Class Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// Class UI
class UI {
    addBookToList(book) {
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

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    showAlert(message,className) {
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
}

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
    
    // Show Alert after delete book
    ui.showAlert('Book Deleted!','success');

    e.preventDefault();
});