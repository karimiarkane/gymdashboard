

import { auth } from "../auth";
import MyTable from "../components/MyTable"
import { redirect } from "next/navigation";


const getAtheltes =async  ()=> {
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
  const session = await auth()
  console.log("session from the home page",session)

  if(!session){
    redirect("/")
  }
  return (
    <>
    {/* <Layout> */}
    <MyTable data={athletes}  />  
     {/* </Layout>  */}
    </>
  );
}
