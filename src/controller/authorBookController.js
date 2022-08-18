const bookModel = require('../models/bookModel')
const authorModel = require('../models/authorModel')

// Create book collection
const createBook = async function(req, res){
    let book = req.body
    let collectionBook = await bookModel.create(book)

    res.send({data:collectionBook})
}
//create author collection
const createAuthor = async function(req, res){
    let author = req.body
    let collectionAuthor = await authorModel.create(author)

    res.send({data:collectionAuthor})
}

//for author_id present or not
// const isAuthorId = async function(req, res){
//     let authorId = await authorModel.findOne({author_id:1})
//     if(authorId) res.send({msg:authorId,condition:true})
//     else res.send({msg: "No AuthorId found" , condition: false})
// }


const isAuthorId = async function(req, res){
    let authorId = await bookModel.findOne({author_id:0})
    if(authorId) res.send({msg:authorId,condition:true})
    else res.send({msg: "No AuthorId found" , condition: false})
}

//list all books written by Chetan Bhagat

let listOfBooks = async function(req,res){
    let authorId = await authorModel.findOne({author_name:"J.k Rowling"}).select({author_id:1,_id:0})
    let book = await bookModel.find({author_id:{$eq:authorId['author_id']}})

    console.log(book);
    res.send({msg:book})
}

// find author of two states and update the price to 100

let findAndUpdateBook = async function(req,res){
   
    let book = await bookModel.findOneAndUpdate(
        {name:"Two states"},
        {$set:{price:300}},
        {new:true}
    ).select({author_id:1,name:1,price:1,_id:0})
    console.log(book)
    let author = await authorModel.find({author_id:{$eq:book['author_id']}}).select({author_name:1,_id:0})

    res.send({msg:author,book})
}
//
let authorName = async function(req,res){
    let books = (await bookModel.find({price:{ $gte: 50, $lte: 100}})).map(x=>x.author_id)
    let author=  await authorModel.find({author_id:books}).select({author_name:1})
     
    console.log(author);

    res.send({msg:author})
}


module.exports.authorName=authorName
module.exports.findAndUpdateBook=findAndUpdateBook
module.exports.isAuthorId=isAuthorId
module.exports.listOfBooks=listOfBooks
module.exports.createBook=createBook
module.exports.createAuthor=createAuthor