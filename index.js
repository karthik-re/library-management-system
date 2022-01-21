const app = require("./app");
const {connectToDB}  = require('./database');

async function main(){
    try{
        await connectToDB();
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, (err)=>{
        if(err){
            console.log(err);
        } else {
            console.log(`Server started on port: ${PORT}`);
        }
    });
    }catch(err){
        console.error(err);
    }
}

main();

/*
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err)=>{
    if(err){
        console.log(err);
    } else {
        console.log(`Server started on port: ${PORT}`);
    }
});

*/