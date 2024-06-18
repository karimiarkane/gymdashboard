"use client"
import {useState} from "react"
import {useRouter} from 'next/navigation'

const EditDeliteUser = ({user}) => {
console.log("user ",user)
  // format dates got from the db to be used in the input type date
    const date = new Date(user.DateDebut);
    user.DateDebut = date.toISOString().split('T')[0];
    const dateee = new Date(user.DateFin);
    user.DateFin = dateee.toISOString().split('T')[0];

    const [userInfo, setUserInfo] = useState(user);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const router = useRouter()

    const hundleDeliteClick = async ()=>{
      setErrorMsg("")
      setSuccessMsg("")
     try{
        const res =  await fetch(`http://localhost:3000/api/athlete/${user._id}`,{
            headers:{
                "Content-Type":"application/json"
            },
            method:"DELETE"
        }
        )
        const resback = await res.json()
        if(resback.status !== 200){
            throw new Error(resback.message)
        }else{
            setSuccessMsg(resback.message)
            router.push("/home")
        }
     }catch(err){
        setErrorMsg(err.message || "une erreure s'est produite ressayer plus tard")
        console.log(err)
     }
    }

    const hundleChange = (e) => {
        if (e.target.type === "radio") {
          setUserInfo({ ...userInfo, [e.target.name]: e.target.id });
        } else {
          setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
        }
      };

      const hundleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");
        try {
          const reponce = await fetch(`http://localhost:3000/api/athlete/${user._id}`, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(userInfo),
          });
          const resback = await reponce.json()
          if(resback.status !== 200){
            throw new Error(resback.message)
          }else{
            setSuccessMsg("user updated");
            router.push("/home")
          }
        } catch (err) {
          setErrorMsg("something went wrong try later")
          console.log(err);
        }
      };
  return (
<>
<form
        onSubmit={hundleSubmit}
        className="m-3.5 p-2.5 text-left border-solid border-2  relative"
      >
        <div className="p-2.5">
          <label htmlFor="nom" className="text-gray-600">
            Nom :{" "}
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            onChange={hundleChange}
            value={userInfo.nom}
            className=" pr-12 pl-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          ></input>
        </div>
        <div className="p-2.5">
          <label htmlfor="prenom" className="text-gray-600">
            Prenom :{" "}
          </label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            onChange={hundleChange}
            value={userInfo.prenom}
            className=" pr-12 pl-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          ></input>
        </div>
        <div className="p-2.5">
          <label htmlfor="dated" className="text-gray-600">
            date debut :{" "}
          </label>
          <input
            type="date"
            id="dated"
            name="DateDebut"
            onChange={hundleChange}
            value={userInfo.DateDebut}
            className=" pr-12 pl-5 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          ></input>
        </div>
        <div className="p-2.5">
          <label htmlfor="datef" className="text-gray-600">
            date fin :{" "}
          </label>
          <input
            type="date"
            id="datef"
            name="DateFin"
            onChange={hundleChange}
            value={userInfo.DateFin}
            className=" pr-12 pl-5 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          ></input>
        </div>
        <div className="p-2.5">
          <h2 className="text-gray-800 font-medium">Status :</h2>
          <div>
            <input
              type="radio"
              name="status"
              id="autorisé"
              onChange={hundleChange}
              value={userInfo.status}
              className="form-radio border-gray-400 text-indigo-600 focus:ring-indigo-600 duration-150"
            />
            <label
              htmlFor="autorisé"
              className="text-sm text-gray-600 font-medium ml-1"
            >
              Authorisé
            </label>
          </div>

          <div>
            <input
              type="radio"
              name="status"
              id="nonautorisé"
              onChange={hundleChange}
              className="form-radio border-gray-400 text-indigo-600 focus:ring-indigo-600 duration-150 "
            />
            <label
              htmlFor="nonautorisé"
              className="text-sm text-gray-600 font-medium ml-1"
            >
              Nonauthorisé
            </label>
          </div>
        </div>
        {successMsg && (
          <div className="text-green-500 pr-12 pl-5 py-1.5 ">{successMsg}</div>
        )}
        {errorMsg && <div className="text-red-500 pr-12 pl-5 py-1.5">{errorMsg}</div>}
        <div className=" absolute right-1 bottom-2 flex -my-16 gap-2 ">
                <button
            onClick={hundleDeliteClick}
            className="px-6 py-2 text-indigo-600 bg-indigo-50 rounded-lg duration-150 hover:bg-indigo-100 active:bg-indigo-200 cursor-pointer"
                  > supprimer
            </button>
            <input
              type="submit"
              value="update"
              className="px-6 py-2 text-indigo-600 bg-indigo-50 rounded-lg duration-150 hover:bg-indigo-100 active:bg-indigo-200 cursor-pointer"
            />
        </div>
      </form>
   
</>
   
  )
}

export default EditDeliteUser