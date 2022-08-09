const express = require('express');
const lodash = require('lodash')
const abc = require('../introduction/intro')
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    logger.welcome()

    res.send('My second ever api!')
});

router.get('/students', function (req, res){
    let students = ['Sabiha', 'Neha', 'Akash']
    res.send(students)
})

router.get('/student-details/:name', function(req, res){
    /*
    params is an attribute inside request that contains 
    dynamic values.
    This value comes from the request url in the form of an 
    object where key is the variable defined in code 
    and value is what is sent in the request
    */

    let requestParams = req.params

    // JSON strigify function helps to print an entire object
    // We can use any ways to print an object in Javascript, JSON stringify is one of them
    console.log("This is the request "+ JSON.stringify(requestParams))
    let studentName = requestParams.name
    console.log('Name of the student is ', studentName)
    
    res.send('Dummy response')
})



router.get('/movies',function(req,res){
   
    const movies = ['Baazigar','Jo Jeeta Wohi Sinkander','Anand','Bhool Bholiya','Karan-Arjun']
    res.send(movies)
})

router.get('/movies/:indexNumber',function(req,res){
    const movies = ['Baazigar','Jo Jeeta Wohi Sinkander','Anand','Bhool Bholiya','Karan-Arjun']
    let index=parseInt(req.params.indexNumber)
    let movieName=movies[index]
    

    if(index>=movies.length || index<0){
        return res.send("invalid")
    }
    return res.send(movieName)
    // using package lodash
    // const result=lodash.nth(movies,index)
    // res.send(result)
})


let moviesArr= [ {
    'id': 1,
    'name': 'The Shining'
   }, {
    'id': 2,
    'name': 'Incendies'
   }, {
    'id': 3,
    'name': 'Rang de Basanti'
   }, {
    'id': 4,
    'name': 'Finding Nemo'
   }]

router.get('/films',function(req,res){
    
       
       res.send(moviesArr)
})

router.get('/films/:filmId',function(req,res){

    let filmsId=parseInt(req.params.filmId)
    for(let i=0;i<moviesArr.length;i++){
    if(moviesArr[i].id==filmsId){
        return res.send(moviesArr[i])
    }
  }
  return res.send("Invalid Id")
})



module.exports = router;

//given an array [10,20,5,2,100] find the nth largest Digit. n=3
