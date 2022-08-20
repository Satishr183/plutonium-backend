const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const publisherController= require('../controllers/publisherController')
const bookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor  )
router.post('/createPublisher', publisherController.createPublisher)

router.post("/createBook", bookController.createBook)


router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)

// if(book['author']){
//     if(authorId===author){

//         let bookCreated = await bookModel.create(book)
//         return res.send({data: bookCreated})
      
//     }else{
//       res.send({msg:'Invalid Author Id'})
//     }
//   }else{
//       res.send({msg:'Author Id Required !'})
//   }
 

module.exports = router;