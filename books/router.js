const express = require('express');
const router = express.Router();
const { createBook,getAll,getBook,deleteBook,updateBook,getHistory } = require('./module');



//POST
router.post("/",async (req,res,next)=>{
    try{
        //console.log(result);
        res.status(200).send(await createBook(req.body));
    }catch(error){
        res.status(400).send({message: error.message});
    }
})

//GET/:id
router.get('/:id', async (req,res,next)=>{
    try{
        res.status(200).send(await getBook(req.params.id));
    }catch(err){
        res.status(400).send({message:err.message});
    }
})

//POST/:id
router.post("/:id",async (req,res,next)=>{
    try{
        res.status(200).send(await updateBook(req.params.id,req.body));
    }catch(err){
        res.status(400).send({message:err.message});
    }
})

//DELETE/:id
router.delete("/:id",async (req,res,next)=>{
    try{
        res.status(200).send(await deleteBook(req.params.id));
    }catch(err){
        res.status(400).send({message:err.message});
    }
})

//GET/ all books
router.get('/', async (req,res,next)=>{
    try{
        res.status(200).send(await getAll());
    }catch(err){
        res.status(400).send({message:err.message});
    }
})

//GET/:id/history
router.get('/:id/history',async (req,res,next)=>{
    try{
        res.status(200).send(await getHistory(req.params.id));
    }catch(err){
        res.status(400).send({message:err.message});
    }
})

module.exports = router;
