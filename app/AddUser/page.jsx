
import AddUser from "../components/AddUser";
import {auth} from "../auth"
import { redirect } from "next/navigation";

const AddUserPage =async  () => {
const session = await auth()
console.log("session from the add user",session)
if(!session){
  redirect("/")
}

  return (
    <>
    <AddUser />
    </>
  );
};

export default AddUserPage;
