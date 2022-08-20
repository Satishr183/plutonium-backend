const authorModel = require("../models/authorModel");
const bookModel = require("../models/bookModel");
const publisherModel = require("../models/publisherModel");

const createBook = async function (req, res) {
  let book = req.body;
  let authorId = book.author;
  let publisherId = book.publisher;
  if (authorId) {
    if (publisherId) {
      let id = await authorModel.findById(authorId).select({ _id: 1 });
      if (id) {
        let id1 = await publisherModel.findById(publisherId).select({ _id: 1 });
        if (id1) {
          let bookCreated = await bookModel.create(book)
                 res.send({data: bookCreated})
        } else {
          res.send({ msg: "Invalid Publisher Id" });
        }
      } else {
        res.send({ msg: "Invalid Author Id" });
      }
    } else {
      res.send({ msg: "Publisher id required" });
    }
  } else {
    res.send({ msg: "Author id required" });
  }
};

const getBooksWithAuthorDetails = async function (req, res) {
  let allBook = await bookModel.find().populate("author").populate("publisher");
  res.send({ data: allBook });
};

// a) Add a new boolean attribute in the book schema called isHardCover with a default false value.
//  For the books published by 'Penguin' and 'HarperCollins', update this key to true.

const isHardCover = async function(req, res){
  let publisherId = await publisherModel.find({name:{$in:["Pentagon","HarperCollins"]}})
  let books = await bookModel.updateMany(
    {publisher:publisherId},
    {$set:{isHardCove:true}},
    {new:true}
  )
  res.send({msg:books})
}

// b) For the books written by authors having a rating greater than 3.5,
//  update the books price by 10 (For eg if old price for such a book is 50, new will be 60) 

const updatePrice= async function(req, res){
  let authorRating = await authorModel.find({ratings:{$gte:3.5}})
  let updatedBookPrice = await bookModel.updateMany(
    {author:authorRating},
    {$inc:{price:10}},
    {new:true}
  )
  console.log(authorRating)

  res.send({msg:updatedBookPrice})
}


module.exports.updatePrice=updatePrice
module.exports.isHardCover=isHardCover
module.exports.createBook = createBook;
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails;
