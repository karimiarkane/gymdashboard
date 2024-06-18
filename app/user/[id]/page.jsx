import EditDeliteUser from "../../components/EditDeliteUser"
const  getuser = async (id)=>{
    try{
        const data = await fetch(`http://localhost:3000/api/athlete/${id}`) 
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