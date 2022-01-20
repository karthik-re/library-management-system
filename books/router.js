const express = require('express');
const router = express.Router();
const { createBook } = require('./module');
const bookSchema  = require("./validation");

router.post("/",async (req,res,next)=>{
    try{
        const result = await bookSchema.validateAsync(req.body);
        //console.log(result);
        res.status(200).send(await createBook(result));
    }catch(error){
        res.status(400).send({message: error.message});
    }
})


module.exports = router;
