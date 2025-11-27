'use strict';

const conatiner = document.querySelector('#container-el');
const main = document.querySelector('main');
const addBook = document.querySelector('#addBook-el');

const dialog = document.querySelector('dialog');
const titleEl = document.querySelector('#title-el');
const authorEl = document.querySelector('#author-el');
const pagesEl = document.querySelector('#pages-el');
const selectEl = document.querySelector('#select-el');

const bookNum = document.querySelector('#bookNum-el');
const completedBooks = document.querySelector('#completedBooks-el');
const delAll = document.querySelector('#nuke');
let num = 0;
let completed = 0;
let library = [];
function Book(id, title, author, pages, isRead) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  (this.id = id),
    (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.isRead = isRead);
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead}`;
};

function createBooks(title, author, pages, isRead) {
  const id = crypto.randomUUID();
  const book = new Book(id, title, author, pages, isRead);
  library.push(book);
  return book;
}

createBooks('Atomic Habits', 'James Clear', 320, 'not Read');
createBooks("Can't Hurt me", 'David Goggins', 220, 'Read');

function createBookCard() {
  const div = document.createElement('div');
  const h1 = document.createElement('h1');
  const h2 = document.createElement('h2');
  const span = document.createElement('span');

  const btnDiv = document.createElement('div');
  const btn1 = document.createElement('button');
  const btn2 = document.createElement('button');

  btnDiv.append(btn1, btn2);
  div.append(h1, h2, span, btnDiv);
  main.insertBefore(div, addBook);

  return { div, h1, h2, span, btnDiv, btn1, btn2 };
}

function displayBooks(libraryArr) {
  // const allBooks = document.querySelectorAll('.bookCard-Container');

  libraryArr.forEach((book) => {
    // if (allBooks) {
    //   if(allBooks.some((div) => div.dataset.id === book.id)){
    //     console.log('oi');
    //   }

    // }
    const bookCard = createBookCard();
    bookCard.div.classList = 'bookCard-Container';
    bookCard.div.setAttribute('data-group', 'book');
    bookCard.div.setAttribute('data-id', book.id);
    bookCard.h1.textContent = book.title;
    bookCard.h2.textContent = `by ${book.author}`;
    bookCard.span.textContent = `${book.pages}, ${book.isRead}`;
    bookCard.btn1.textContent = book.isRead;
    bookCard.btn2.textContent = 'Delete';
    bookCard.btn2.setAttribute('id', 'del-btn');
    bookCard.btn2.setAttribute('data-id', book.id);

    bookCard.btn2.addEventListener('click', () => {
      bookCard.div.remove();
      library = library.filter((books) => books.id !== book.id);
      num = library.length;
      bookNum.textContent = `Books Num:${num}`;
      if (book.isRead === 'Read') {
        completed--;
        completedBooks.textContent = `Completed:${completed}`;
      }
    });
    if (book.isRead === 'Read') {
      completed++;
    }

    bookCard.btn1.addEventListener('click', () => {
      book.isRead = book.isRead === 'Read' ? 'not Read' : 'Read';
      bookCard.span.textContent = `${book.pages}, ${book.isRead}`;
      bookCard.btn1.textContent = book.isRead;
      if (book.isRead === 'Read') {
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

addBook.addEventListener('click', () => {
  dialog.showModal();
});
dialog.addEventListener('close', () => {
  if (dialog.returnValue === 'confirm') {
    const title = titleEl.value;
    const author = authorEl.value;
    const pages = pagesEl.value;
    const isRead = selectEl.value;
    // const allBooks = document.querySelectorAll('.bookCard-Container');
    const newBook = createBooks(title, author, pages, isRead);
    const newLibrary = library.filter((book) => book.id === newBook.id);
    displayBooks(newLibrary);
  }
  titleEl.value = '';
  authorEl.value = '';
  pagesEl.value = '';
  selectEl.value = 'default';
  console.log(library);
});
displayBooks(library);

delAll.addEventListener('click', () => {
  const allBooks = document.querySelectorAll('div[data-group=book]');
  allBooks.forEach((bookCard) => bookCard.remove());
  library = [];
  num = 0;
  completed = 0;
  bookNum.textContent = `Books Num:${num}`;
  completedBooks.textContent = `Completed:${completed}`;
});
// function reset(books) {
//   books.forEach((book) => {
//     book.remove();
//   });
// }
// function deleteBook() {
//   let delBtns = document.querySelectorAll('#del-btn');
//   delBtns.forEach((btn) =>
//     btn.addEventListener('click', () => {
//       const id = btn.dataset.id;
//        library = library.filter((book) => book.id !== id);
//       const div = document.querySelector(`div[data-id =${id}]`);
//       div.remove();
//       // const allBooks = document.querySelectorAll('.bookCard-Container');
//       // library
//       // displayBooks(newLibrary);
//     })
//   );
// }
// deleteBook()
