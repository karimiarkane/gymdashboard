export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server'
export async function POST(request){
    const {NomEtPrenom , Password} = await request.json()  
    if(!NomEtPrenom  || !Password){
        return NextResponse.json({status:400, message:"Tous les champs sont obligatoires "})
    }
    console.log("NomEtPrenom : ",NomEtPrenom , "password" , Password , "env : ", process.env.NOM_PRENOM , process.env.PASSWORD) 
if(NomEtPrenom == process.env.NOM_PRENOM && Password == process.env.PASSWORD){  
        return NextResponse.json({status:200, message:"informations d'acces correctes"})
    }else{
        return NextResponse.json({status:500, message:"informations d'acces incorrectes"})
    }
    
}
