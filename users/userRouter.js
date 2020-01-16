const express = require('express');
const Users = require('./userDb.js');
const Posts = require('../posts/postDb.js');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  console.log(req.body)
  Users.insert(req.body)
  .then(newUser => {
    res.status(201).json(newUser)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: "There was an issue saving this user."})
  })
});

router.post('/:id/posts',validatePost ,(req, res) => {
  console.log(req.body)
  Posts.insert(req.body)
  .then(newPost => {
    res.status(201).json(newPost)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: "There was an issue saving this post."})
  })
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

router.get('/:id', validateUserId, (req, res) => {
  const id = req.params.id
  console.log('req from get user by id', req)
  Users.getById(id)
  .then(user => {
      res.status(200).json(user)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: "There was an error finding that user"})
  })
});

router.get('/:id/posts', (req, res) => {
  const id = req.params.id
  Users.getById(id)
  .then(user => {
    if(!user){
      res.status(400).json({message: "That user id does not exist"})
    }else{
      Users.getUserPosts(user.id)
      .then(userPosts => {
        res.status(200).json(userPosts)
      })
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: "There was an error finding posts for that user"})
  })
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Users.remove(id)
  .then(userToDelete => {
    console.log("User has been deleted")
    res.status(204).end()
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: "we ran into and issue deleting user"})
  })
});

router.put('/:id', validateUserId, (req, res) => {
  const id = req.params.id;
  console.log(id);
  Users.update(id , req.body)
  .then(updatedUser => {
    res.status(201).json(updatedUser)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: "we ran into an issue updating selected user"})
  })
});

//custom middleware

function validateUserId(req, res, next) {
  // console.log('req inside of validateUserId', req);
  const id = req.params.id
  console.log('id inside of validate user id', id)
  Users.getById(id)
  .then(user => {
    if(!user){
      res.status(400).json({message: "Invalid user id"})
    }else {
       req.user = user
      next();
    }
  })
  .catch(err => {
    res.status(500).json({message: "There was an error finding that user"})
  })
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
