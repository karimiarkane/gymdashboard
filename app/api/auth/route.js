
import { NextResponse } from 'next/server'
export async function POST(request){
    const {NomEtPrenom , Password} = await request.json()  
    if(!NomEtPrenom  || !Password){
        return NextResponse.json({status:400, message:"Tous les champs sont obligatoires "})
    }
if(NomEtPrenom == process.env.NOM_PRENOM && Password == process.env.PASSWORD){  
        return NextResponse.json({status:200, message:"informations d'acces correctes"})
    }else{
        return NextResponse.json({status:500, message:"informations d'acces incorrectes"})
    }
    
}
