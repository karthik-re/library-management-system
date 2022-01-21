const express = require('express');
const router = express.Router();
const { createLoan,getAll,getLoan,updateLoan,deleteLoan } = require('./module');

//POST/
router.post("/",async (req,res,next)=>{
    try{
        res.status(200).send(await createLoan(req.body));
    }catch(error){
        res.status(400).send({message: error.message});
    }
})

//GET?:id
router.get('/:id', async (req,res,next)=>{
    try{
        res.status(200).send(await getLoan(req.params.id));
    }catch(err){
        res.status(400).send({message:err.message});
    }
})

//POST/:id
router.post("/:id",async (req,res,next)=>{
    try{
        res.status(200).send(await updateLoan(req.params.id,req.body));
    }catch(err){
        res.status(400).send({message:err.message});
    }
})

//DELETE/:id
router.delete("/:id",async (req,res,next)=>{
    try{
        res.status(200).send(await deleteLoan(req.params.id));
    }catch(err){
        res.status(400).send({message:err.message});
    }
})

//GET/ all loans
router.get('/', async (req,res,next)=>{
    try{
        res.status(200).send(await getAll());
    }catch(err){
        res.status(400).send({message:err.message});
    }
})

module.exports = router;
