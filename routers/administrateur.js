import {Router} from 'express';
import AdministrateurController from '../controllers/administrateur.js';
import { auth } from '../middleware/auth.js';

const routerAdministrateur = Router()

routerAdministrateur.post('/create' , AdministrateurController.create);
routerAdministrateur.post('/login' , AdministrateurController.login);
routerAdministrateur.get('/all' , auth , AdministrateurController.getAll);
routerAdministrateur.get('/:id' , auth , AdministrateurController.getOne);
routerAdministrateur.put('/edit/:id' , auth , AdministrateurController.edit);
routerAdministrateur.put('/delete/:id' , auth , AdministrateurController.delete);


export default routerAdministrateur;