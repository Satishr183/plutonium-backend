const express = require('express');
const lodash = require('lodash')
const abc = require('../introduction/intro')
const printName = require("../logger/logger")
const Print =require("../util/helper")
const formatter = require("../validator/formatter")

const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    res.send('My second ever api!')
});

router.get('/assignment',function(req,res){
    printName.printLetters()
    Print.date()
    Print.batch()
    formatter.trim()
    formatter.upper()
    formatter.lower()

    let arr=['jan','feb','mar','april','may','june','july','aug','sept','oct','nov','dec']
    let output = lodash.chunk(arr,4)
    console.log(output)

    let oddAr=[1,5,7,11,17,3,13,19,27,33]
     const tail=lodash.tail(oddAr,1)
     console.log(tail);

     let u1=[1,2,5,4,3,4]
     let u2=[1,5,4,1]
     const union=lodash.union(u2,u1)
     console.log(union)

     let obj= [['horror','The Shining'],['drama','Titanic'],['thriller','Shutter Island'],['fantasy','Pans Labyrinth']]
     const paris=lodash.fromPairs(obj)
     console.log(paris);


    res.send('Complete Assignment')
})


router.get('/test-you', function(req, res){
    res.send('This is the second routes implementation')
})

router.get('/give-me-students-data',function(req, res){
})
module.exports = router;
// adding this comment for no reason