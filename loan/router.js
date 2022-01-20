const express = require('express');
const router = express.Router();
const { createLoan } = require('./module');
const schema  = require("./validation");

router.post("/",async (req,res,next)=>{
    try{
        const result = await schema.validateAsync(req.body);
        //console.log(result);
        res.status(200).send(await createLoan(result));
    }catch(error){
        res.status(400).send({message: error.message});
    }
})
module.exports = router;
