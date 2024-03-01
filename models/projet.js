import { model , Schema } from 'mongoose'

const ProjetModel = new Schema({
    titre:{
        type : String,
        required : true
    },
    type:{
        type : String,
        required : true
    },
    domaine:{
        typr : String,
        required : true
    },
    description :{
        type : String,
        required : true
    },
    montant:{
        type: String,
        required :true
    },
    utilisateur :{
        type : Schema.type.ObjectId,
        ref: 'utilisateur'
    }
},
    {
        timestamps: true
    }
)

export default model('projet', ProjetModel)