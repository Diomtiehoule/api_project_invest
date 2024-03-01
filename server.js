import express from 'express';
import cors from 'cors';
import  { mongoConnect }  from "./config/db_connect.js" ;
import routeUtilisateur from './routers/utilisateur.js';
import routerProjet from './routers/projet.js';

const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3000
mongoConnect()
.then(()=>{
    app.listen(port,() =>{
        console.log(`le server est lancé sur le port ${port}`);
    })
})
.catch(e =>{
    console.log('une erreur est survenue' , e.message)
})

app.use('/api/utilisateur' , routeUtilisateur);
app.use('/api/projet' , routerProjet);