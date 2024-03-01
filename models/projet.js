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
        type : String,
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
        type : Schema.Types.ObjectId,
        ref: 'utilisateur',
        required : true
    },
    status :{
        type : Number,
        default : 1,
        required : true
    }
},
    {
        timestamps: true
    }
)

export default model('projet', ProjetModel)