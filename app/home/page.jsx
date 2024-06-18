export const dynamic = "force-dynamic";
import MyTable from "../components/MyTable"

const getAtheltes =async  ()=> {
  try {
    const res = await fetch("http://localhost:3000/api/athlete",{cache : "no-store"});
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
    <MyTable data={athletes} />   
    </>
  );
}
