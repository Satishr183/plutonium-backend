const AuthorModel= require("../models/authorModel")

const createAuthor= async function (req, res) {
    let author = req.body
    let authorCreated = await AuthorModel.create(author)
    res.send({data: authorCreated})
}



module.exports.createAuthor= createAuthor


// else if(!publisherId){
//     if(id1 !== publisherId){
//         res.send({msg:'invalid publisher id'})
//        }
//        else if(id !== authorId){
//         res.send({msg:'invalid author id'})
//     }else{
//         let bookCreated = await bookModel.create(book)
//         res.send({data: bookCreated})
        
//     }
    
// }
// else{
//     res.send({msg:'publisher id required'})
// }