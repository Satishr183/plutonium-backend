router.get('movies/:indexNumber',function(req,res){
     
     let movieIndex= movies[req.params.indexNumber]
     console.log(movieIndex);
     res.send(movieIndex)
    
})