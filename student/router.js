const express = require('express');
const router = express.Router();
const { getStudent,updateStudent,getAll,deleteStudent,createStudent } = require('./module');

//POST/ new student
router.post("/",async (req,res,next)=>{
    try{
        res.status(200).send(await createStudent(req.body));
    }catch(err){
        res.status(400).send({message:err.message});
    }
})

//GET/:id
router.get("/:id",async (req,res,next)=>{
    try{
        res.status(200).send(await getStudent(req.params.id));
    }catch(err){
        res.status(400).send({message:err.message})
    }
})

//POST/:id
router.post("/:id",async (req,res,next)=>{
    try{
        res.status(200).send(await updateStudent(req.params.id,req.body));
    }catch(err){
        res.status(400).send({message:err.message});
    }
})

//DELETE/:id
router.delete("/:id",async (req,res,next)=>{
    try{
        res.status(200).send(await deleteStudent(req.params.id));
    }catch(err){
        res.status(400).send({message:err.message});
    }
})

//GET/ all students
router.get('/', async (req,res,next)=>{
    try{
        res.status(200).send(await getAll());
    }catch(err){
        res.status(400).send({message:err.message});
    }
})
module.exports = router;