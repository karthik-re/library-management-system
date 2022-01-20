const express = require('express');
const router = express.Router();
const { createStudent } = require('./module');
const schema  = require('./validation');

router.post("/",async (req,res,next)=>{
    try{
        const result = await schema.validateAsync(req.body);
        res.status(200).send(await createStudent(result));
    }catch(err){
        res.status(400).send({message:err.message});
    }
})

module.exports = router;