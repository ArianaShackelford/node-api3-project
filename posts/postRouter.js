const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePost(req, res, next) {
  if(req.body === 0 ){
    res.status(400).json({message : "missing post data"})
  }else if(!req.body.text){
    res.status(400).json({message : "missing required text field"})
  }else{
    next();
  }
}

module.exports = router;
