class Book {
  constructor(title, author, priority, category) {
    this.title = title;
    this.author = author;
    this.priority = priority;
    this.category = category;
  }
}

class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.priority}</td>
        <td>${book.category}</td>
      `;

    list.appendChild(row);
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    setTimeout(() => document.querySelector('.alert').remove(), 5000);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#category").value = "";
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
}

document.addEventListener("DOMContentLoaded", UI.displayBooks);

const submit = () => {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const priority = document.querySelector('input[name="priorityRadios"]:checked').value;
  const category = document.querySelector("#category").value;
 
  if(title.length < 1 || author.length < 3 || priority === '' || category === '') {
    UI.showAlert('Proszę wypełnij wszystkie pola odpowiednio (tytuł min. 1 znak | autor min. 3 znaki | wybierz priorytet oraz kategorię)', 'danger');
  } else {
  const book = new Book(title, author, priority, category);

  UI.addBookToList(book);
  Store.addBook(book);
  UI.clearFields();
};
}