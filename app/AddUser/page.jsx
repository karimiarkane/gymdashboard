"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddUser = () => {
  const [userInfo, setUserInfo] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
const router = useRouter()
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
      const reponce = await fetch("http://localhost:3000/api/athlete", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(userInfo),
      });
      const resback = await reponce.json()
      if(resback.status !== 200){
        throw new Error(resback.message)
      }else{
        setSuccessMsg(resback.message);
        router.push("/home")
      }
    } catch (err) {
      setErrorMsg(err.message || "Une erreur s'est produite . Veuillez réessayer")
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
          required
            type="text"
            id="nom"
            name="nom"
            onChange={hundleChange}
            className=" pr-12 pl-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          ></input>
        </div>
        <div className="p-2.5">
          <label htmlfor="prenom" className="text-gray-600">
            Prenom :{" "}
          </label>
          <input
          required
            type="text"
            id="prenom"
            name="prenom"
            onChange={hundleChange}
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
            className=" pr-12 pl-5 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          ></input>
        </div>
        <div className="p-2.5">
          <label htmlfor="datef" className="text-gray-600">
            date fin :{" "}
          </label>
          <input
          required
            type="date"
            id="datef"
            name="DateFin"
            onChange={hundleChange}
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
        <input
          type="submit"
          value="ajouter "
          className="px-6 py-2 text-indigo-600 bg-indigo-50 rounded-lg duration-150 hover:bg-indigo-100 active:bg-indigo-200 absolute right-2 bottom-2 cursor-pointer"
        />
    

      </form>
    </>
  );
};

export default AddUser;