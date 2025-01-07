import express from "express"; 

// abe sab kuch bhul gaya me 

export const forwardauthenticate = (req , res, next)=> { 
    const authenticated = req.isAuthenticated(); 
    if(authenticated){ 
        res.redirect("/"); 
    }else{ 
        next(); 
    }
}


