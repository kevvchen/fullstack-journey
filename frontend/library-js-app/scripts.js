const myLibrary = [];

// Book container
const bookContainer = document.querySelector(".books-section");

// Book Constructor
function Book(id, title, author, pages, isRead) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// Creates a book then store it in the array
function addToLibrary(id, title, author, pages, isRead) {
  const newBook = new Book(id, title, author, pages, isRead);
  myLibrary.push(newBook);

  displayBook(myLibrary[myLibrary.length - 1], bookContainer);
}

// Creates the DOM nodes
function displayBook(bookObj, parent) {
  // Create Card Container
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  bookCard.setAttribute("id", bookObj.id);

  // Create book title
  const bookTitle = document.createElement("h3");
  bookTitle.textContent = `${bookObj.title}`;
  bookCard.appendChild(bookTitle);

  // Create book author
  const bookAuthor = document.createElement("h6");
  bookAuthor.textContent = `By ${bookObj.author}`;
  bookCard.appendChild(bookAuthor);

  // Create book pages
  const bookPages = document.createElement("p");
  bookPages.textContent = `${bookObj.pages} pages`;
  bookCard.appendChild(bookPages);

  // Create book buttons (isRead toggle button, delete book button)
  const bookButtons = document.createElement("div");
  bookButtons.classList.add("book-buttons");

  const isReadButton = document.createElement("button");
  isReadButton.textContent = `${bookObj.isRead ? "READ" : "NOT READ"}`;
  isReadButton.classList.add(`${bookObj.isRead ? "read" : "not-read"}`);

  isReadButton.addEventListener("click", () => {
    toggleRead(isReadButton, ["read", "not-read"]);
    bookObj.isRead = !bookObj.isRead;
  });

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("remove-button");

  deleteButton.addEventListener("click", () =>
    deleteBookCard(bookCard, bookObj.id)
  );

  bookButtons.appendChild(isReadButton);
  bookButtons.appendChild(deleteButton);
  bookCard.appendChild(bookButtons);

  parent.prepend(bookCard);
}

const toggleRead = (readBtn, isReadState) => {
  isReadState.forEach((state) => {
    readBtn.classList.toggle(state);
    if (readBtn.classList.contains("read")) {
      readBtn.textContent = "READ";
    } else {
      readBtn.textContent = "NOT READ";
    }
  });
};

const deleteBookCard = (bookCardNode, bookId) => {
  // Delete the DOM node
  bookCardNode.remove();

  // Delete the object in array -> Find index of the bookObject with this id
  const index = myLibrary.findIndex((book) => book.id === bookId);
  myLibrary.splice(index, 1);

  console.log(myLibrary);
};

// Populate array with a couple of books so far
function initialTests() {
  addToLibrary(
    crypto.randomUUID(),
    "The Catcher in the Rye",
    "J.D. Salinger",
    304,
    false
  );
  addToLibrary(crypto.randomUUID(), "Atomic Habits", "James Clear", 320, true);
  addToLibrary(
    crypto.randomUUID(),
    "Ikigai: The Japanese Secret to a Long and Happy Life",
    "Hector Garcia, Francesc Miralles",
    208,
    true
  );
}

function displayBooks() {
  // Go through each array and create DOM elements
  myLibrary.forEach((book) => {
    // Create Card Container
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    // Create book title
    const bookTitle = document.createElement("h3");
    bookTitle.textContent = `${book.title}`;
    bookCard.appendChild(bookTitle);

    // Create book author
    const bookAuthor = document.createElement("h6");
    bookAuthor.textContent = `By ${book.author}`;
    bookCard.appendChild(bookAuthor);

    // Create book pages
    const bookPages = document.createElement("p");
    bookPages.textContent = `${book.pages} pages`;
    bookCard.appendChild(bookPages);

    // Create book buttons (isRead toggle button, delete book button)
    const bookButtons = document.createElement("div");
    bookButtons.classList.add("book-buttons");
    const isReadButton = document.createElement("button");
    isReadButton.textContent = `${book.isRead ? "Read" : "Not Read"}`;
    bookButtons.appendChild(isReadButton);
    bookCard.appendChild(bookButtons);

    bookContainer.appendChild(bookCard);
  });
}

initialTests();

function showModal() {
  document.getElementById("form-modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("form-modal").classList.add("hidden");
}

const addBookBtn = document.getElementById("add-book-btn");
addBookBtn.addEventListener("click", showModal);

const closeBookBtn = document.getElementById("close-btn");
closeBookBtn.addEventListener("click", closeModal);

// Handle FormData
const form = document.getElementById("add-book-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const bookTitle = document.getElementById("book_title").value;
  const bookAuthor = document.getElementById("book_author").value;
  const bookPages = document.getElementById("book_page_amount").value;
  const bookIsRead = document.getElementById('is_book_read').checked;

  addToLibrary(
    crypto.randomUUID(),
    bookTitle,
    bookAuthor,
    bookPages,
    bookIsRead
  );

  form.reset();
});
