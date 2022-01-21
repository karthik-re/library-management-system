const schema  = require('./validation');
const {Student} = require('./../database');

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