async function createLoan(loanPlayload) {
    return {
      loanId:1,
      bookId: loanPlayload.bookId,
      studentId:loanPlayload.studentId,
      outDate: loanPlayload.outDate,
      returnDate:loanPlayload.returnDate
    };
  }

exports.createLoan  = createLoan;
