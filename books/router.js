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


/*
const { Router } = require('express');
const { createBook } = require('./modules');
const route = Router();

route.post('/', async (req, res, next) => {
  try {
    res.status(200).send(await createBook(req.body));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = route;

*/