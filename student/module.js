const schema  = require('./validation');
const {Book,Student,Loan}  = require('./../database');

async function createStudent(body) {
    
  await schema.validateAsync(body);
  return await Student.create(body);
}

exports.createStudent = createStudent;

async function getStudent(id){
  const student = await Student.findByPk(id);
  if(!student) throw new Error("Student not found. Please enter valid ID");
  return student;
}

exports.getStudent = getStudent;

async function updateStudent(id,body){
  const student = await Student.findByPk(id);
  if(!student) throw new Error("Student not found. Please enter valid ID");
  student.set({
    studentName:body.studentName
  })
  await student.save();
  
  return student;
}

exports.updateStudent = updateStudent;

async function deleteStudent(id){
  const student = await Student.findByPk(id);
  if(!student) throw new Error("Student not found. Please enter valid ID");
  await student.destroy();
  return "Student is deleted successfully"
}

exports.deleteStudent =deleteStudent;

async function getAll(){
  const students = await Student.findAll();
  return students;
}

exports.getAll = getAll;

//--------------------------HISTORY----------------------
async function getHistory(id){
  
  const student = await Student.findByPk(id);
  if(!student) throw new Error("Student not found. Please enter valid ID");
  
  let rawhistory = await Loan.findAll({where:{studentId:id}});
  if(rawhistory.length === 0) throw new Error("No history exists for the student");

  let history = JSON.parse(JSON.stringify(rawhistory));

  for(let i=0;i<history.length;i++){
    let book  = await Book.findByPk(history[i].bookId)
    history[i].bookTitle = book.bookTitle;
    history[i].bookAuthor = book.bookAuthor;
  }

  return history;
}

exports.getHistory = getHistory;