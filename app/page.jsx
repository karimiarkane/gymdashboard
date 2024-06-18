"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
const Auth = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [userCredentials, setUserCredentials] = useState({});
  const router = useRouter();
  const hundleChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };
  const hundleSubmit = async (e) => {
    setErrorMsg("");
  setSuccessMsg("");
    try {
      e.preventDefault();
      const res = await fetch("http://localhost:3000/api/auth", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(userCredentials),
      });
      const resback = await res.json();
      if (resback.status !== 200) {
        throw new Error(resback.message);
      } else {
        setSuccessMsg(resback.message);
        router.push("/home");
      }
    } catch (err) {
      setErrorMsg(
        err.message || "une erreure s'est produite ressayer plus tard"
      );
    }
  };
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
        <form onSubmit={hundleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="font-medium" htmlFor="nometprenom">
              Nom et prenom
            </label>
            <input
            value={userCredentials.NomEtPrenom || ""}
              onChange={hundleChange}
              name="NomEtPrenom"
              id="nometprenom"
              placeholder="nom  prenom"
              type="text"
              required
              autoComplete="off"
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium" htmlFor="password">
              mot de passe
            </label>
            <input
            value={userCredentials.Password || ""}
              id="password"
              name="Password"
              onChange={hundleChange}
              placeholder="mot de passe"
              type="password"
              required
              autoComplete="off"
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
            Entrer
          </button>
            {errorMsg && <p className="text-red-500">{errorMsg}</p>}
            {successMsg && <p className="text-green-500">{successMsg}</p>}
        </form>
      </div>
    </main>
  );
};

export default Auth;
