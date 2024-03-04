import AdministrateurModel from "../models/administrateur.js";
import {generateToken} from "../middleware/token.js"
import bcrypt from "bcrypt";

class AdministrateurController{

    /**
     * @param {request} req
     * @param {response} res
     */
    static async create(req , res){
        try {
            const { email } = req.body
            const adminExist = await AdministrateurModel.findOne({email : email})
            if(adminExist) res.status(200).json({status : false , message : "Ce compte existe déjà !!!"})
            req.body.password = await bcrypt.hash(req.body.password , 10)
            console.log(req.body)
            const newAdmin = await AdministrateurModel.create(req.body)
            if(!newAdmin) res.status(400).json({message : "impossible de créer cet utilisateur !!!"})
            res.status(200).json({status : true ,message : "admin créer avec succès !!!" , newAdmin})
        } catch (error) {
            res.status(500).json({status : false , message : "une erreur est survenue lors du traitement !!!" , error : error.message})
        }
    }

    /**
     * @param {request} req
     * @param {response} res
     */
    static async login(req , res){
        try {
            const { email , password } = req.body
            const admin = await AdministrateurModel.findOne({email : email})
            if(!admin) res.status(400).json({message :  "Compte introuvable !!!"})
            const pwdVerify = await bcrypt.compare(password , admin.password)
            if(!pwdVerify) res.status(400).json({message : "Adresse mail ou mot de passe incorrect !!!"})
            res.cookie("token" , generateToken(admin.toObject()))
            return res.status(200).json({status : true ,message : "connexion effectuées avec succès !!!" , token : generateToken(admin.toObject()) , admin})
        } catch (error) {
            res.status(500).json({status : false , message : "une erreur est survenue lors du traitement !!!" , error : error.message})
            console.log('une erreur est survenue...', error)
        }
    }

    /**
     * @param {request} req
     * @param {response} res
     */
    static async getAll(req , res){
        try {
            const { userId } = req.auth
            const adminConnected = await AdministrateurModel.findById({_id : userId , status : 1})
            if(!adminConnected) res.status(400).json({message : "vous n'avez pas cette autorisation !!!"})
            const allAdmin = await AdministrateurModel.find({status : 1})
            if(!allAdmin) res.status(400).json({status : false , message : "aucun liste disponible pour vos administrateurs !!!"})
            return res.status(200).json({status : true , message : "la liste de tout vos administrateur" , allAdmin})
        } catch (error) {
            res.status(500).json({status : false , message : "une erreur est survenue lors du traitement !!!" , error : error.message})
            console.log('une erreur est survenue...', error)
        }
    }

    /**
     * @param {request} req
     * @param {response} res
     */
    static async getOne(req , res){
        try {
            const {id} = req.params
            const { userId } = req.auth
            const adminConnected = await AdministrateurModel.findById({_id : userId , status : 1})
            if(!adminConnected) res.status(400).json({message : "vous n'avez pas cette autorisation !!!"})
            const admin = await AdministrateurModel.findOne({_id : id })
            if(!admin) res.status(400).json({status : false , message : "administrateur introuvable !!!"})
            return res.status(200).json({status : true , message : "votre administrateur" , admin})
        } catch (error) {
            res.status(500).json({status : false , message : "une erreur est survenue lors du traitement !!!" , error : error.message})
            console.log('une erreur est survenue...', error)
        }
    }

    /**
     * @param {request} req
     * @param {response} res
     */
    static async edit(req , res){
        try {
            const {id} = req.params
            const { userId } = req.auth
            
            const adminConnected = await AdministrateurModel.findById({_id : userId , status :1})
            if(!adminConnected) res.status(400).json({status :false , message : "vous n'avez pas cette autorisation !!!"})
            await AdministrateurModel.updateOne({_id : id , status : 1} , req.body)
            .then(success =>{
                res.status(200).json({status : true ,message : "vos information ont été modifiées avec succès !!!" , success})
            })
            .catch(err =>{
                res.status(400).json({status : false , message : "impossible de modifier vos informaton !!!" , error : err.message})
            })
        } catch (error) {
            res.status(500).json({status : false , message : "une erreur est survenue lors du traitement !!!" , error : error.message})
            console.log('une erreur est survenue...', error)
        }
    }

     /**
     * @param {request} req
     * @param {response} res
     */
     static async delete(req , res){
        try {
            const {id} = req.params
            const { userId } = req.auth
            
            const adminConnected = await AdministrateurModel.findById({_id : userId , status :1})
            if(!adminConnected) res.status(400).json({status :false , message : "vous n'avez pas cette autorisation !!!"})
            await AdministrateurModel.updateOne({_id : id , status : 1} , {status : 0})
            .then(success =>{
                res.status(200).json({status : true ,message : "votre compte à été modifiées avec succès !!!" , success})
            })
            .catch(err =>{
                res.status(400).json({status : false , message : "impossible de supprimer vos informaton !!!" , error : err.message})
            })
        } catch (error) {
            res.status(500).json({status : false , message : "une erreur est survenue lors du traitement !!!" , error : error.message})
            console.log('une erreur est survenue...', error)
        }
    }
    
}

export default AdministrateurController