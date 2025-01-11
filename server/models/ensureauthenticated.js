import express from "express"; 

 

export const forwardauthenticate = (req , res, next)=> { 
    const authenticated = req.isAuthenticated(); 
    if(authenticated){ 
        res.redirect("/"); 
    }else{ 
        next(); 
    }
}


