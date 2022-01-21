const { Sequelize } = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');


const db  = new Sequelize({
    dialect: "sqlite"
});

const Book = db.define('Book',{
    bookId: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    bookTitle: {
        type:DataTypes.STRING,
        allowNull:false
    },
    bookAuthor: {
        type:DataTypes.STRING,
        allowNull:false
    }
    },{
    //other db options  
});

exports.Book = Book;

const Student = db.define('Student',{
    studentId: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    studentName: {
        type:DataTypes.STRING,
        allowNull:false
    }
    },{
    //other db options  
});

exports.Student = Student;

const Loan = db.define('Loan',{
    loanId: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    bookId: {
        type:DataTypes.INTEGER,
        allowNull:false
    },
    studentId: {
        type:DataTypes.INTEGER,
        allowNull:false
    },
    outDate: {
        type:DataTypes.DATE,
        allowNull:false
    },
    returnDate: {
        type:DataTypes.DATE,
        allowNull:true
    }
    },{
    //other db options  
});

exports.Loan = Loan;

exports.connectToDB = async function(){
    await db.authenticate();
    console.log("Database connection extablished");
    await db.sync({force: true});
    console.log("All tables synced");
}

exports.disconnectDB = async function(){
    try{
        await db.close();
    }catch(err){
        console.error(err);
    }
}