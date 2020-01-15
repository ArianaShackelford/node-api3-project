const express = require('express');
const Users = require('./userDb.js');

const router = express.Router();

router.post('/', (req, res) => {
  
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  Users.get()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: "There was an error retrieveing user data"})
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  if(!req.body.id){
    res.status(400).json({message: "Invalid user id"})
  }else {
    req.body.id = req.user
    next();
  }
}

function validateUser(req, res, next) {
  if(!req.body){
    res.status(400).json({message: "missing user data"})
  }else if(!req.body.name){
    res.status(400).json({message : "missing required name feild"})
  }else{
    next();
  }
}

function validatePost(req, res, next) {
  if(!req.body){
    res.status(400).json({message : "missing post data"})
  }else if(!req.body.text){
    res.status(400).json({message : "missing required text field"})
  }else{
    next();
  }
}

module.exports = router;
