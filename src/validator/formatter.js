let trim=function(){
    let str="   Satish Rajbanshi     "
    let output = str.trim()
    console.log("   Satish Rajbanshi   ==trim  =>"+output);
}

module.exports.trim=trim
//====================================================================
let upperCase=function(){
    let str="satish rajbanshi"
    let output = str.toUpperCase()
    console.log("satish rajbanshi ==upperCase =>"+output);
}

module.exports.upper=upperCase
//=====================================================================

let lowerCase=function(){
    let str="SATISH RAJBANSHI"
    let output = str.toLowerCase()
    console.log("SATISH RAJBANSHI ==lowerCase =>"+output);
}

module.exports.lower=lowerCase