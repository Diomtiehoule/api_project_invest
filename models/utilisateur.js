import { model , Schema }from 'mongoose';

const UtilisateurModel = new Schema({
    nom :{
        type : String,
        required : true
    },
    prenom :{
        type : String,
        required : true
    },
    contact :{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String,
        required : true
    },
    status :{
        type : Number,
        default : 1,
        required : true
    }

},
    {
        timestamps : true
    }
)


export default model('utilisateur', UtilisateurModel)