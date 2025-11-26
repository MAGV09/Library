'use strict';

const conatiner = document.querySelector('#container-el');
const main = document.querySelector('main');
const library = [];
function Book(id, title, author, pages, isRead) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  (this.id = id),
    (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.isRead = isRead ? 'read' : 'not read yet');
}
Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead}`;
};

function createBooks(title, author, pages, isRead) {
  const id = crypto.randomUUID();
  const book = new Book(id, title, author, pages, isRead);
  library.push(book);
}
createBooks('Atomic Habits', 'James Clear', 320, false);
createBooks("Can't Hurt me", 'David Goggins', 220, true);

function createBookCard() {
  const div = document.createElement('div');
  const h1 = document.createElement('h1');
  const h2 = document.createElement('h2');
  const span = document.createElement('span');

  const btnDiv = document.createElement('div');
  const btn1 = document.createElement('button');
  const btn2 = document.createElement('button');
  const btn3 = document.createElement('button');

  btnDiv.append(btn1, btn2, btn3);
  div.append(h1, h2, span, btnDiv);
  main.appendChild(div);

  return { div, h1, h2, span, btnDiv, btn1, btn2, btn3 };
}
function displayBooks(library) {
  library.forEach((book) => {
    const bookCard = createBookCard();
    bookCard.div.classList='bookCard-Container'
    bookCard.h1.textContent = book.title;
    bookCard.h2.textContent = `by ${book.author}`;
    bookCard.span.textContent = `${book.pages}, ${book.isRead}`;
    bookCard.btn1.textContent = 'Read';
    bookCard.btn2.textContent = 'Info';
    bookCard.btn3.textContent = 'Delete';
  });
}

displayBooks(library);
