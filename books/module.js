const bookSchema  = require("./validation");
const {Book}  = require('./../database');


async function createBook(bookPayload) {
    await bookSchema.validateAsync(bookPayload);
    return await Book.create(bookPayload);
}

exports.createBook = createBook;


async function getBook(id){
  const book = await Book.findByPk(id);
  if(!book) throw new Error("Book not found. Please enter valid ID");
  return book;

}

exports.getBook = getBook;


async function updateBook(id,body){
  const book = await Book.findByPk(id);
  if(!book) throw new Error("Book not found. Please enter valid ID");
  book.set({
    bookTitle:body.bookTitle,
    bookAuthor:body.bookAuthor
  })
  await book.save();
  
  return book;
}

exports.updateBook = updateBook;

async function deleteBook(id){
  const book = await Book.findByPk(id);
  if(!book) throw new Error("Book not found. Please enter valid ID");
  await book.destroy();
  return "Book is deleted successfully"
}

exports.deleteBook =deleteBook;

async function getAll(){
  const books = await Book.findAll();
  return books;
}

exports.getAll = getAll;