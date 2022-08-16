const bookModel = require('../models/bookModel')

//To create bookList

const createBook = async function(req, res){
    let bookList = req.body
    let saveBook = await bookModel.create(bookList)

    res.send({msg: saveBook})
}

//get list of all Books

const getBookList = async function(req, res){
    let allBookList = await bookModel.find()

    res.send({msg: allBookList})
}

//We need to export our Logic or functionality

module.exports.createBook=createBook
module.exports.getBookList=getBookList
