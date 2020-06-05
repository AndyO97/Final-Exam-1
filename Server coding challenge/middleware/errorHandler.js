function errorHandler(req, res) {
    /* 

        Your code goes here

    */
   id=req.params.id;
   Bid=req.body.id;
   firstName=req.body.firstName;
   lastName=req.body.lastName;

   if(!Bid){
       res.statusMessage = `Id is missing in the body of the request`;
       return res.status(406).send();
   }
   if(id!=Bid){
       res.statusMessage = `Id and movie_ID do not match`;
       return res.status(409).send();
   }
   if(!firstName || !lastName){
       res.statusMessage = `You need to send both firstName and lastName of the actor to remove
       from the movie list.`;
       return res.status(403).send();
   }

   return Movies
   .getMovieById (id)
   .then(movie =>{
       if(!movie){
           res.statusMessage = `The movie doesnt exist`;
       return res.status(404).send();
       }
       return Actors
       .getActorByName(firstName, lastName)
       .then(actor =>{
           if(!actor){
               res.statusMessage = `The actor doesnt exist`;
               return res.status(404).send();
           }
           return res.status(201).json(actor);
       })
       .catch(error =>{
           res.statusMessage = `There is an error with the database`;
           return res.status(500).send();
       })

   })
   .catch(error =>{
       res.statusMessage = `There is an error with the database`;
       return res.status(500).send();
   })
}

module.exports = errorHandler;