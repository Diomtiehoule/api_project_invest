import mongoose from 'mongoose'
import { url } from './mongoLink.js'

export const mongoConnect = async () =>{
    try{
        let mongoUrl = url
        if(!mongoUrl) throw new Error ("url mongodb introuvable !")
        await mongoose.connect(mongoUrl , {
         useNewUrlParser : true ,
        useUnifiedTopology : true})
        .then(()=>{
            console.log("Connexion éffectuée à MongoDB")
        })
    } 
    catch (err){
        console.log("Vérifiez votre connexion !!")
        throw new Error(err)
    }
}

