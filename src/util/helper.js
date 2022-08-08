const date= new Date()
let day = date.getDate();
let month = date.getMonth()+1 ;
let year = date.getFullYear();

let printDate=function(){
    
    console.log(day+"-"+month+"-"+year);
}

module.exports.date=printDate
//=======================================================================
let batchName="PLUTONIUM"
let week="W3D5"
let getBatchInfo=function(){
    console.log(batchName+","+week+", the topic for today is nodeJS module system.");
}

module.exports.batch=getBatchInfo