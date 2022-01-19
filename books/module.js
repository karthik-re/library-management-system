async function createBook(bookPlayload) {
    //if (!bookPlayload.bookTitle) throw new Error('Title is required');
    //if (!bookPlayload.bookAuthor) throw new Error('Author is required');
    return {
      bookId: 1,
      bookTitle: bookPlayload.bookTitle,
      bookAuthor: bookPlayload.bookAuthor,
    };
  }

exports.createBook = createBook;
