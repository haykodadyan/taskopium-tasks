let books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
    { id: 3, title: "1984", author: "George Orwell", year: 1949 },
    { id: 4, title: "The Catcher in the Rye", author: "J.D. Salinger", year: 1951 },
    { id: 5, title: "One Hundred Years of Solitude", author: "Gabriel Garcia Marquez", year: 1967 },
    { id: 6, title: "Infinite Jest", author: "David Foster Wallace", year: 1996 },
    { id: 7, title: "Ulysses", author: "James Joyce", year: 1922 }
];

function createBookList(books) {

    let debounceTimer;
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = "";

    if (!books.length) {
        const p = document.createElement('p');
        p.textContent = 'No books found';
        bookList.appendChild(p);
        return;
    }

    const searchInput = document.getElementById('search-input');

    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(filterBooks, 900);
    });

    if (debounceTimer === undefined) {
        filterBooks();
    }
}

function filterBooks() {

    const inputText = document.getElementById('search-input').value.trim().toLowerCase();
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = "";

    const filteredList = books.filter(book => 
        book.title.toLowerCase().includes(inputText) || book.author.toLowerCase().includes(inputText)
    )

    if (!filteredList.length) {
        const p = document.createElement('p');
        p.textContent = 'No books found';
        bookList.appendChild(p);
    } else {
        filteredList.forEach(book => {
            const li = document.createElement('li');
            li.innerHTML = `
            <p>ID: ${book.id}</p>
            <p>Title: ${book.title}</p>
            <p>Author: ${book.author}</p>
            <p>Year: ${book.year}</p>
            `;
            bookList.appendChild(li);
        })
    }
}

createBookList(books);