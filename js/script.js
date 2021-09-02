/* hidding spinner at begining */
document.getElementById('loading-spinner').style.display = 'none';

/* onclick listener to load books  */
const showBooks = () => {

    /* clear full window under search box  */
    document.getElementById('show-books').textContent = '';
    document.getElementById('total-book-or-error-message').textContent = '';

    /* load spinner before loading data  */
    document.getElementById('loading-spinner').style.display = 'block';

    /* getting books name from input text  */
    const searchInput = document.getElementById('search-input-text');
    const bookName = searchInput.value;
    searchInput.value = '';

    /* checking book name is null or not  */
    if (bookName === '') {
        showResultOrErrorMessage('Please, Enter a book name');
        return;
    }

    /* fetching data from url  */
    const url = `https://openlibrary.org/search.json?q=${bookName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data))
}
/* function to show number of result found or show error message  */
const showResultOrErrorMessage = message => {

    /* spinner before loading data  */
    document.getElementById('loading-spinner').style.display = 'block';
    const numberOfResultShowing = document.getElementById('total-book-or-error-message');

    /* create new div  */
    const newDiv = document.createElement('div');

    /* setting innerHTML inside created div */
    newDiv.innerHTML = `
            <h4 class="text-danger text-center">${message}</h4>
        `;

    /* appending created div  */
    numberOfResultShowing.appendChild(newDiv);

    /* hiding spinner */
    document.getElementById('loading-spinner').style.display = 'none';
}

/* function to display books in website */
const displayBooks = books => {
    const allBooks = books.docs;

    /* getting total number of books */
    const totalFoundedResult = books.numFound;

    /* getting number of books showing*/
    const showingNumberOfResult = Object.keys(allBooks).length;

    /* checking result is null or not */
    if (totalFoundedResult === 0) {
        showResultOrErrorMessage('Sorry!!!!! No result Found');
    }
    else {
        showResultOrErrorMessage(`Showing ${showingNumberOfResult} of ${totalFoundedResult} Result`);
    }

    /* for each loop to load all books */
    allBooks.forEach(book => {
        /* calling load books function to load all books */
        loadBooks(book);
    })
}

/* function to load books  */
const loadBooks = book => {

    /* handling errors if occur any */

    /* setting new image if no image found */
    if (book.cover_i == null) {
        book.cover_i = `./images/book-sample_preview-1.png`;
    }
    else {
        book.cover_i = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    }

    /* if no publish_place found make it empty */
    if (book.publish_place == null) {
        book.publish_place = '';
    }

    /* if no publisher found make it empty */
    if (book.publisher == null) {
        book.publisher = '';
    }

    /* if no publish_year found make it empty */
    if (book.first_publish_year == null) {
        book.first_publish_year = '';
    }

    /* if no edition count found make it empty */
    if (book.edition_count == null) {
        book.edition_count = '';
    }

    /* create new div to set book data */
    const div = document.createElement('div');
    const showBookContainer = document.getElementById('show-books');
    div.classList.add('col');

    /* adding inner html to new div */
    div.innerHTML = `
        <div class="card h-100 shadow">
            <img src="${book.cover_i}" height="350px" class="card-img-top p-3" alt="...">
            <div class="card-body">
                <h4 class="card-title">${book.title}</h4>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><span class="fw-bold">Author : </span>${book.author_name}</li>
                    <li class="list-group-item"><span class="fw-bold">Publisher : </span>${book.publisher}</li>
                    <li class="list-group-item"><span class="fw-bold">Publish place : </span>${book.publish_place}</li>
                    <li class="list-group-item"><span class="fw-bold">First Published In : </span>${book.first_publish_year}</li>
                    <li class="list-group-item"><span class="fw-bold">Total Edition :  </span>${book.edition_count}</li>
                </ul>
            </div>
        </div>
    `;

    /* append created div */
    showBookContainer.appendChild(div);
    /* hiding spinner after loading data */
    document.getElementById('loading-spinner').style.display = 'none';
}