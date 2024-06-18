export const dynamic = "force-dynamic";
import { NextResponse } from "next/server"
import connection from "../../../config/connection"
import User from '../../../models/UserSchema.jsx'

export async function DELETE(request, {params}){
  const {id} = params
  try{
    await connection()
    await User.findByIdAndDelete(id)
    return NextResponse.json({status:200 , message:"utilisateur suprimé avec succès"})
  }catch(err){
    console.log("err from the back is : " ,  err)
    return NextResponse.json({status : 500 , message:"une erreur s'est produite veuillez réessayer plus tard"})
  }
}

export async function PUT(request, {params}){
  const {id} = params
  try{ 
    await connection()
    await User.findByIdAndUpdate(id,await request.json())
    return NextResponse.json({status:200 , message:"utilisateur modifié avec succès"})
  }catch(err){
    console.log("err from the back is : " ,  err)
    return NextResponse.json({status:500 , message:"une erreur s'est produite veuillez réessayer plus tard"})

  }
}

export async function GET(request, {params}){
  const {id} = params
  try{
    await connection()
    const user = await User.findById(id)
    return NextResponse.json({status:200, data: user})
  }catch(err){
    console.log("err from the back is : " ,  err)
    return NextResponse.json({status:500, message: "an error is happened try later"})
  }
}

