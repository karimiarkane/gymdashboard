import EditDeliteUser from "../../components/EditDeliteUser"
import { auth } from "../../auth";

const  getuser = async (id)=>{

    
    try{
        const data = await fetch(`https://gymdashboard.vercel.app/api/athlete/${id}`) 
        return await data.json()
}catch(err){
    console.log(err)
}
}

const User = async ({params}) => {

    const session = await auth()
if(!session){
    redirect("/")
}
    const {data} = await getuser(params.id)

  return (
   
  <>
   <EditDeliteUser user={data}/>
 
  </>
  )
}

export default User