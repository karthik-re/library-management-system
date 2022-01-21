const schema  = require("./validation");
const {Loan} = require('./../database');

async function createLoan(body) {

  await schema.validateAsync(body);
  return await Loan.create(body);

}
exports.createLoan  = createLoan;

async function getLoan(id){
  const loan = await Loan.findByPk(id);
  if(!loan) throw new Error("Loan not found. Please enter valid ID");
  return loan;
}

exports.getLoan = getLoan;

async function updateLoan(id,body){
  const loan  = await Loan.findByPk(id);
  if(!loan) throw new Error("Loan not found. Please enter valid ID");
  loan.set({
    bookId:body.bookId,
    studentId:body.studentId,
    outDate:body.outDate,
    returnDate: body.returnDate
  });
  await loan.save();
  return loan;
}

exports.updateLoan= updateLoan;

async function deleteLoan(id){
  const loan  = await Loan.findByPk(id);
  if(!loan) throw new Error("Loan not found. Please enter valid ID");
  await loan.destroy();
  return "Loan is deleted successfully";
}

exports.deleteLoan = deleteLoan;

async function getAll(){
  const loans = await Loan.findAll();
  return loans;
}

exports.getAll = getAll;