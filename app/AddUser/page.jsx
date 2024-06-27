
import AddUserComponent from "../components/AddUserComponent";
import {auth} from "../auth"
import { redirect } from "next/navigation";

const AddUserPage =async  () => {
const session = await auth()
if(!session){
  redirect("/")
}



  return (
    <>
    <AddUserComponent />
    </>
  );
};

export default AddUserPage;
