import { Router } from 'express'
import ProjetController from '../controllers/projet.js'
import {auth} from '../middleware/auth.js'

const routerProjet = Router()

routerProjet.post('/create' , auth , ProjetController.create);
routerProjet.get('/all' , auth , ProjetController.getAll);
routerProjet.get('/:id' , auth , ProjetController.getOne);
routerProjet.put('/edit/:id' , auth , ProjetController.edit);
routerProjet.put('/delete/:id' , auth , ProjetController.delete);



export default routerProjet