"use strict";

const conatiner = document.querySelector("#container-el");
const main = document.querySelector("main");
const addBook = document.querySelector("#addBook-el");

const dialog = document.querySelector("dialog");
const form = document.querySelector("#form");
const titleEl = document.querySelector("#title-el");
const authorEl = document.querySelector("#author-el");
const pagesEl = document.querySelector("#pages-el");
const selectEl = document.querySelector("#select-el");

const bookNum = document.querySelector("#bookNum-el");
const completedBooks = document.querySelector("#completedBooks-el");
const delAll = document.querySelector("#nuke");
const searchInput = document.querySelector("#search");
let num = 0;
let completed = 0;
let library = [];
class Book {
  //
  constructor(id, title, author, pages, isRead) {
    ((this.id = id),
      (this.title = title),
      (this.author = author),
      (this.pages = pages),
      (this.isRead = isRead));
  }
  toggleRead() {
    this.isRead = this.isRead === "Read" ? "not Read" : "Read";
  }
}

function createBooks(title, author, pages, isRead) {
  const id = crypto.randomUUID();
  const book = new Book(id, title, author, pages, isRead);
  library.push(book);
  return book;
}

//intialize 2 books
createBooks("Atomic Habits", "James Clear", 320, "not Read");
createBooks("Can't Hurt me", "David Goggins", 220, "Read");

class createBookCard {
  div = document.createElement("div");
  h1 = document.createElement("h1");
  h2 = document.createElement("h2");
  span = document.createElement("span");

  btnDiv = document.createElement("div");
  btn1 = document.createElement("button");
  btn2 = document.createElement("button");

  render() {
    this.btnDiv.append(this.btn1, this.btn2);
    this.div.append(this.h1, this.h2, this.span, this.btnDiv);
    main.insertBefore(this.div, addBook);
  }
}

function displayBooks(libraryArr) {
  libraryArr.forEach((book) => {
    const bookCard = new createBookCard();
    bookCard.render();
    bookCard.div.classList.add("bookCard-Container");
    bookCard.div.setAttribute("data-group", "book");
    bookCard.div.setAttribute("data-id", book.id);
    bookCard.div.setAttribute("data-title", book.title);

    bookCard.h1.textContent = book.title;
    bookCard.h2.textContent = `by ${book.author}`;
    bookCard.span.textContent = `${book.pages}, ${book.isRead}`;

    bookCard.btn1.textContent = book.isRead;
    bookCard.btn2.textContent = "Delete";
    bookCard.btn2.setAttribute("id", "del-btn");
    bookCard.btn2.setAttribute("data-id", book.id);

    bookCard.btn2.addEventListener("click", () => {
      bookCard.div.remove();
      library = library.filter((books) => books.id !== book.id);
      num = library.length;
      bookNum.textContent = `Books Num:${num}`;
      if (book.isRead === "Read") {
        completed--;
        completedBooks.textContent = `Completed:${completed}`;
      }
    });

    if (book.isRead === "Read") {
      completed++;
    }

    bookCard.btn1.addEventListener("click", () => {
      book.toggleRead();
      bookCard.span.textContent = `${book.pages}, ${book.isRead}`;
      bookCard.btn1.textContent = book.isRead;
      if (book.isRead === "Read") {
        completed++;
      } else {
        completed--;
      }
      completedBooks.textContent = `Completed:${completed}`;
    });
  });
  num = library.length;
  bookNum.textContent = `Books Num:${num}`;
  completedBooks.textContent = `Completed:${completed}`;
}

addBook.addEventListener("click", () => {
  dialog.showModal();
});

dialog.addEventListener("close", () => {
  if (dialog.returnValue === "confirm") {
    const title = titleEl.value;
    const author = authorEl.value;
    const pages = pagesEl.value;
    const isRead = selectEl.value;
    const newBook = createBooks(title, author, pages, isRead);
    const newLibrary = library.filter((book) => book.id === newBook.id);
    displayBooks(newLibrary);
  }
  titleEl.value = "";
  authorEl.value = "";
  pagesEl.value = "";
  selectEl.value = "default";
  console.log(library);
});
form.addEventListener("change", (e) => {
  if (titleEl.validity.valueMissing) {
    titleEl.setCustomValidity("title is missing yo");
  } else if (titleEl.validity.tooShort) {
    titleEl.setCustomValidity("title is too short yoo");
  } else {
    titleEl.setCustomValidity("");
  }
});
form.addEventListener("submit", (e) => {});
//inital display
displayBooks(library);

delAll.addEventListener("click", () => {
  const allBooks = document.querySelectorAll("div[data-group=book]");
  allBooks.forEach((bookCard) => bookCard.remove());
  library = [];
  num = 0;
  completed = 0;
  bookNum.textContent = `Books Num:${num}`;
  completedBooks.textContent = `Completed:${completed}`;
});

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const allBooks = document.querySelectorAll("div[data-group=book]");

  allBooks.forEach((bookCard) => {
    const title = bookCard.dataset.title.toLowerCase();

    if (searchTerm === "" || title.includes(searchTerm)) {
      bookCard.classList.remove("hide");
    } else {
      bookCard.classList.add("hide");
    }
  });
});
