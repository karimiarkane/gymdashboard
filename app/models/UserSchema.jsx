import mongoose  from "mongoose";

const UserSchema = new mongoose.Schema({

    nom: {
        type : String,
        required : true
    } ,
    prenom:{
        type : String,
        required: true
    } ,
    DateDebut : {
        type : Date,
        required:true
    },

    DateFin: {
        type : Date,
        required : true
    },
    status: {
        type: String,
        enum: ['autorisé', 'nonautorisé'],
        required: true
    },
} ,{timestamps :true}
)

const User =  mongoose.models.User ||mongoose.model('User', UserSchema)
export default User;