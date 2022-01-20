const express = require('express');
const router = express.Router();
const { createBook } = require('./module');
const {getBook}  = require('./module');
const {updateBook}  = require('./module');
const {deleteBook}  = require('./module');
const {getAll}  = require('./module');



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

module.exports = router;
