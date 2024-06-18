export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import connection from "../../config/connection";
import User from '../../models/UserSchema.jsx'

function checkValidite(user){
if (user.DateFin.getTime() < Date.now()   ){
    user.status = "nonautorisé"
}
return user
}


export async function GET(){
    try{
    await connection()
    const users = await User.find()
    let refactoredUsers =  users.map(checkValidite)
     return NextResponse.json({status:200, data: refactoredUsers}) 
}catch(err){
    console.log("error from the backend :",err)
    return NextResponse.json({status:500 ,message:"Une erreur s'est produite . Veuillez réessayer "})
}
}


export async function POST(request){
    const {nom , prenom, DateDebut, DateFin, status} = await request.json()
    if(!nom || !prenom || !DateDebut || !DateFin || !status){
        return NextResponse.json({status:400, message:"Tous les champs sont obligatoires "})
    }
    try{
        connection()
        await User.create({nom, prenom, DateDebut, DateFin, status})
        return NextResponse.json({status:200, message:"Utilisateur créé avec succès"})
    }catch(err){
        console.log("error from the backend :", err)
        return NextResponse.json({status:500, message:"Une erreur s'est produite . Veuillez réessayer "})
    }
}

