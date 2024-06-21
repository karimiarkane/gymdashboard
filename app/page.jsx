

import { getServerSession } from "next-auth";
import MyTable from "./components/MyTable"
import { redirect } from "next/navigation";

const getAtheltes =async  ()=> {
  const session = await getServerSession()
  if(!session){
    redirect("/api/auth/signin")
  }
  console.log("session",session)
    try {
    const url = process.env.NEXT_PUBLIC_ENVIRONMENT === "development" ? process.env.NEXT_PUBLIC_API_URL_DEV : process.env.NEXT_PUBLIC_API_URL_PROD
    const res = await fetch(`${url}/api/athlete`,{cache : "no-store"});
    if (!res.ok) {
      throw new Error("http responce error");
    }
      const {data} = await res.json();
      return data;

  } catch (err) {
    console.log("get althlete function error ",err);
  }
}

export default async function Home() {


  const athletes = await getAtheltes();
  return (
    <>
    {/* <Layout> */}
    <MyTable data={athletes} />  
     {/* </Layout>  */}
    </>
  );
}
