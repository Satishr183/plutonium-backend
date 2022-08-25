const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://functionup-cohort:G0Loxqc9wFEGyEeJ@cluster0.rzotr.mongodb.net/Pritesh8769811-DB?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

// app.use (
//     function (req, res, next) {
//         console.log ("inside GLOBAL MW");
//         next();
//   }
//   );

app.use(function(req,res,next){

    //For time
    let timeStamp =new Date()
    let format=[timeStamp.getMonth()+1,
        timeStamp.getDate(),
        timeStamp.getFullYear()].join('/')+' '+
       [timeStamp.getHours(),
        timeStamp.getMinutes(),
        timeStamp.getSeconds()].join(':');

    //for route path
    let url=req.path

    //for ip address
    let ipAddress=req.ip
    
    console.log(format," , "+url+" , ",ipAddress)
    next()
    })

app.use('/', route);




app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
