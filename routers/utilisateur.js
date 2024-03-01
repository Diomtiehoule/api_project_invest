import { Router } from 'express';
import UtilisateurController from '../controllers/utilisateur.js'
import { auth } from '../middleware/auth.js';

const routerUtilisateur = Router()

routerUtilisateur.post('/create', UtilisateurController.create);
routerUtilisateur.post('/login' , UtilisateurController.login);
routerUtilisateur.get('/all/:id' , auth , UtilisateurController.getAll);
routerUtilisateur.get('/:id' , auth , UtilisateurController.getOne);
routerUtilisateur.put('/edit/:id' , auth , UtilisateurController.edit);
routerUtilisateur.put('/delete/:id' , auth , UtilisateurController.delete);

export default routerUtilisateur