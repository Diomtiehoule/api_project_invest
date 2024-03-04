import { model , Schema } from 'mongoose'

const AdministrateurModel = new Schema({
    nom :{
        type : String,
        required : true
    },
    prenom :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    },
    status : {
        type :Number,
        default : 1,
        required : true
    }
},
    {
        timestamps : true
    }
)

export default model('administrateur', AdministrateurModel);