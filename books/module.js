const bookSchema  = require("./validation");
const {Book,Student,Loan}  = require('./../database');


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

//--------------------------HISTORY----------------------
async function getHistory(id){
  
  const book = await Book.findByPk(id);
  if(!book) throw new Error("Book not found. Please enter valid ID");
  
  let rawhistory = await Loan.findAll({where:{bookId:id}});
  if(rawhistory.length === 0) throw new Error("No history exists for the book");

  let history = JSON.parse(JSON.stringify(rawhistory));

  for(let i=0;i<history.length;i++){
    let student  = await Student.findByPk(history[i].studentId)
    history[i].studentName = student.studentName;
  }

  return history;
}

exports.getHistory = getHistory;