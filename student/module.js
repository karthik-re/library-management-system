async function createStudent(studentPlayload) {
    return {
      studentId: 1,
      studentName : studentPlayload.studentName
    };
  }

exports.createStudent = createStudent;
