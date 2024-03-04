import AdministrateurModel from "../models/administrateur.js"
import ProjetModel from "../models/projet.js"
import UtilisateurModel from "../models/utilisateur.js"

class ProjetController{

    /**
     * @param {request} req
     * @param {response} res
     */
    static async create(req , res){
        try {
            const {id} = req.params
            const { userId } = req.auth
            const userConnected = await UtilisateurModel.findById({ _id : userId , status : 1})
            const { titre , type , domaine , ...body } = req.body
            if(!userConnected) res.staus(400).json({status : false ,message : "Vous n'avez pas cette autorisation !!"})
            const projectExist = await ProjetModel.findOne({
                titre : req.body.titre,
                type : req.body.type,
                domaine : req.body.domaine,
                description : req.body.description,
                montant : req.body.montant
            })
            if(projectExist) res.status(400).json({status : false ,message : "Cet projet existe déjà !!"})
            const newProjet = await ProjetModel.create({
                titre : req.body.titre,
                type : req.body.type,
                utilisateur : userConnected._id,
                ...req.body
            })
            if(!newProjet) res.status(400).json({status : false ,message : "Impossible d'ajouter ce projet !!!"})
            return res.status(200).json({status : true ,message : "Votre projet a été ajouté avec succès !!!" , newProjet})
        } catch (error) {
            res.status(500).json({status : false ,message : "une erreur est survenue lors du traitement !!!" , error : error.message})
        }
    }

    /**
     * @param {request} req
     * @param {response} res
     */
    static async getOne(req , res){
        try {
            const {id} = req.params
            const {userId} = req.auth
            const userConnected = await UtilisateurModel.findById({_id : userId})
            if(!userConnected) res.status(400).json({status : false , message : "Vous n'avez pas cette autorisation"})
            const projet = await ProjetModel.findById({_id : id , status : 1})
            if(!projet) res.status(400).json({message : "Aucun projet ne correspond !!!"})
            return res.status(200).json({status : true , message : "votre projet" , projet})
        } catch (error) {
            res.status(500).json({status : false ,message : "une erreur est survenue lors du traitement !!!" , error : error.message})
        }
    }

    /**
     * @param {request} req
     * @param {res} res
     */
    static async getAll(req , res){
        try {
            const {id} = req.params
            const { userId } = req.auth
            const userConnected = await UtilisateurModel.findById({_id : userId , status : 1})
            const adminConnected = await AdministrateurModel.findById({_id : userId , status : 1})
            if(!userConnected && !adminConnected) res.status(400).json({message : "Vous n'avez pas cette autorisation !!!"})
            const allProjet = await ProjetModel.find({status : 1})
            if(!allProjet) res.status(400).json({status : false ,message : "Aucune liste disponible..."})
            res.status(200).json({status : true ,message : "La liste de tout les projets..." , allProjet})
        } catch (error) {
            res.status(500).json({status : false ,message : "une erreur est survenue lors du traitement !!!" , error : error.message})
        }
    }

    /**
     * @param {request} req
     * @param {response} res
     */
    static async edit(req , res){
        try {
            const { id } = req.params
            const {userId}= req.auth
            const userConnected = await UtilisateurModel.findById({ _id : userId , status : 1})
            if(!userConnected) res.status(400).json({status : false , message : "vous n'avez pas cette autorisation !!!"})
            const projet = await ProjetModel.findById({_id : id , status : 1})
            if(!projet) res.status(400).json({message : "Aucun projet ne correspond !!!"})
            const infos = {
                "titre" : req.body.titre,
                "type" : req.body.type,
                ...req.body
            }
            const updated = await ProjetModel.updateOne({_id : id , status : 1} , infos)
            if(!updated) res.status(400).json({status : false , message : "mise à jours impossible des informations !!!"})
            return res.status(200).json({status : true , message : "mise à jours des information !!!"})
        } catch (error) {
            res.status(500).json({status : false ,message : "une erreur est survenue lors du traitement !!!" , error : error.message})
        }
    }

    /**
     * @param {request} req
     * @param {response} res
     */
    static async delete(req , res){
        try {
            const { id } = req.params
            const { userId } = req.auth
            const userConnected = await UtilisateurModel.findById({_id : userId})
            if(!userConnected) res.status(400).json({status : false , message : "Vous n'avez pas cette autorisation !!!"})
            const projet = await ProjetModel.findById({_id : id , utilisateur : userId})
            if(!projet) res.status(400).json({status : false , message : "Aucun projet ne correspond..."})
            await ProjetModel.updateOne({_id : id , utilisateur : userId} , {status : 0})
            .then(success =>{
                res.status(200).json({status : true , message : "Votre a été supprimé avec succès !!!" , success})
            })
            .catch(err =>{
                res.status(400).json({status : false , message : "Echec de la suppression..." , error : err.message})
            })
        } catch (error) {
            res.status(500).json({status : false ,message : "Une erreur  est survenue lors du traitement !!!" , error : error.message})
        }
    }
}

export default ProjetController