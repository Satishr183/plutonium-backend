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

module.exports.createBook = createBook;
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails;
