import EditDeliteUser from "../../components/EditDeliteUser"
const  getuser = async (id)=>{
    try{
        const data = await fetch(`https://gymdashboard.vercel.app/api/athlete/${id}`) 
        return await data.json()
}catch(err){
    console.log(err)
}
}

const User = async ({params}) => {
    const {data} = await getuser(params.id)
  return (
   
  <>
   <EditDeliteUser user={data}/>
 
  </>
  )
}

export default User