const express = require('express');
const myHelper = require('../util/helper')
const underscore = require('underscore');
const { functions } = require('underscore');

const router = express.Router();

router.get('/test-me', function (req, res) {
    myHelper.printDate()
    myHelper.getCurrentMonth()
    myHelper.getCohortData()
    let firstElement = underscore.first(['Sabiha','Akash','Pritesh'])
    console.log('The first element received from underscope function is '+firstElement)
    res.send('My first ever api!')
});

router.get("/movies/:indexNumber", function(req, res){
    const movies = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
    console.log(req.params.indexNumber)
    let movieIndex = req.params.indexNumber
    //check index value. less than 0 or greater than array (length - 1) are not valid
    if(movieIndex<0 || movieIndex>=movies.length) {
        //if the index is invalid send an error message
        return res.send('The index value is not correct, Please check the it')
    }

    //if the index was valid send the movie at that index in response
    let requiredMovie = movies[movieIndex]
    res.send(requiredMovie)
})

router.get("/shoes", function(req, res){
    let queryParams = req.query
    let brand = queryParams.brand
    res.send("dummy response")
})

// uses query params
router.get('/candidates', function(req, res){
    console.log('Query paramters for this request are '+JSON.stringify(req.query))
    let gender = req.query.gender
    let state = req.query.state
    let district = req.query.district
    console.log('State is '+state)
    console.log('Gender is '+gender)
    console.log('District is '+district)
    let candidates = ['Akash','Suman']
    res.send(candidates)
})

// use path param
router.get('/candidates/:canidatesName', function(req, res){
    console.log('The request objects is '+ JSON.stringify(req.params))
    console.log('Candidates name is '+req.params.canidatesName)
    res.send('Done')
})

router.get("/films", function(req, res){
    const films = [ {
        "id": 1,
        "name": "The Shining"
       }, {
        "id": 2,
        "name": "Incendies"
       }, {
        "id": 3,
        "name": "Rang de Basanti"
       }, {
        "id": 4,
        "name": "Finding Nemo"
       }]
       //send all the films
      res.send(films) 
})

router.get("/films/:filmId", function(req, res){
    const films = [ {
        "id": 1,
        "name": "The Shining"
       }, {
        "id": 2,
        "name": "Incendies"
       }, {
        "id": 3,
        "name": "Rang de Basanti"
       }, {
        "id": 4,
        "name": "Finding Nemo"
       }]

       let filmId = req.params.filmId

       //iterate all the films
       //search for a film whose id matches with the id recevied in request
       for(let i = 0; i < films.length; i++){
           let film = films[i]
           if(film.id == filmId) {
               //if there is a match return the response from here
               return res.send(film)
           }
       }

       //if there is no match give an error response
       res.send("The film id doesn't match any movie")
})


    // router.get('/post-api',function(req,res){
    //     let sumOfArr=0
    //     for(let i=0;i<arr.length;i++){
    //         sumOfArr +=arr[i]
    //         let length= (arr.length*arr.length+1)/2
    //         let missing=length-sumOfArr
    //     }
        
    // })

       // -write an api which gives the missing number in an array of integers starting from 1….e.g [1,2,3,5,6,7] : 4 is missing
 // Your route code will look like this
 router.get("/sol1", function (req, res) {
    //logic : sum of numbers is n(n+1)/2..so get sum of all numbers in array. now take sum of numbers till last digit in the array
    let arr= [1,2,3,4,5,6,7,9]
    let missingNumber
    let sumArr=0
    for(let i=0;i<arr.length;i++){
        
       sumArr= sumArr+arr[i]
    }
    console.log(sumArr);
    let n=arr.length+1
    let sumFormula=Math.round((n*(n+1))/2)
    console.log(sumFormula);
    missingNumber=sumFormula-sumArr

    ///LOGIC WILL GO HERE 
    res.send(  { data: missingNumber  }  );
});

   // -write an api which gives the missing number in an array of integers starting from anywhere….e.g [33, 34, 35, 37, 38]: 36 is missing
 // Your route code will look like this
 router.get("/sol2", function (req, res) {
    //logic : sum of n consecutive numbers is [ n * (first + last) / 2  ]..so get sum of all numbers in array. now take sum of n consecutive numbers.. n would be length+1 as 1 number is missing
    let arr= [33, 34, 35, 36 , 38]
    let missingNumber
    let sumArr=0
    for(let i=0;i<arr.length;i++){
        
       sumArr= sumArr+arr[i]
    }
    let n=arr.length+1
    let first=arr[0]
    let last =arr[arr.length-1]
    let consecutiveNumber= (n*(first+last)/2)
    missingNumber=consecutiveNumber-sumArr
    ///LOGIC WILL GO HERE 

    res.send(  { data: missingNumber  }  );
});

let players=[
    {
        "name": "manish",
        "dob": "1/1/1995",
        "gender": "male",
        "city": "jalandhar",
        "sports": [
            "swimming"
        ]
    },
    {
        "name": "gopal",
        "dob": "1/09/1995",
        "gender": "male",
        "city": "delhi",
        "sports": [
            "soccer"
        ]
    },
    {
        "name": "lokesh",
        "dob": "1/1/1990",
        "gender": "male",
        "city": "mumbai",
        "sports": [
            "soccer"
        ]
    }
]

router.post('/api-post-assignment', function(req, res){

    let playerDetails=req.body
    let playerName = playerDetails.name
   
    for(let i=0;i<players.length;i++){
        if(players[i].name == playerName){

             return  res.send({data:playerName, status: 'Player Already present in Player DB'})
        }
     }
    players.push(playerDetails)
    res.send({data:players, status:true})
})

router.post('/players/playerName/bookings/bookingId', function(req, res){

})

// let arr= [{
//     "name":"satish",
//     "sport":["football"]
// }]
// router.post("/test-post-4", function(req, res) {
    
//     let ele= req.body.name
//     let sport=req.body.sport
//     arr.push(ele)
//     arr.push(sport)
//     res.send(  { msg: arr , status: true }  )
// })
let array = [23,45,67,281343,32424,423,42323,4234,12,34]
router.post('/post-query-1', function(req, res){
    let input = req.query.input
    let finalArr = array.filter(ele=> ele > input )
    res.send({data:finalArr, status:true})
})

module.exports = router;
// adding this comment for no reason