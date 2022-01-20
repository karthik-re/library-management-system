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