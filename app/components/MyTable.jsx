"use client"
import { useContext, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { refreshContext } from '../context/index';




const MyTable = ({data}) => {
  const router = useRouter()
  const {needToRefresh , setNeedToRefresh} = useContext(refreshContext)
  console.log("context : ",needToRefresh , setNeedToRefresh)
  if(needToRefresh){
    router.refresh()
    setNeedToRefresh(false)
  }
  const [query , setQuery] = useState("")
  const [searchResult , setSearchResult] = useState([])
  const [hasSearched , setHasSearched]= useState(false)
  const hundleChange = (e)=>{
   setQuery(e.target.value)
  }

  const hundleSubmit = async  (e)=>{
    e.preventDefault()
    const result = data.filter((user)=>user.nom.toLowerCase() == query.toLowerCase().split(" ")[0]   && user.prenom.toLowerCase() == query.toLowerCase().split(" ")[1])
    setSearchResult(result)
    setHasSearched(true)
  }

    let authorizedUsers =  data.filter((user)=>{
       return user.status === "autorisé"
    })
    let UnAuthorizedUsers = data.filter((user)=>{
        return user.status === "nonautorisé"})

    const tableItems = [
        {
          label: "Tous",
          nbr:data.length,
          items: data,
        },
        {
          label: "Authorisé",
          nbr:authorizedUsers.length,
          items: authorizedUsers,
        },
        {
          label: "Non Authorisé",
          nbr:UnAuthorizedUsers.length,
          items: UnAuthorizedUsers,
        },
      ];
    
      const [selectedItem, setSelectedItem] = useState(0);
      const labelColors = {
        "autorisé": {
          color: "text-green-600 bg-green-50",
        },
       
        "nonautorisé": {
          color: "text-red-600 bg-red-50",
        },
      };
        const url = process.env.NEXT_PUBLIC_ENVIRONMENT === "development" ? process.env.NEXT_PUBLIC_API_URL_DEV : process.env.NEXT_PUBLIC_API_URL_PROD

  return (
    
   <>

   <div className="max-w-screen-xl mx-auto px-4 md:px-8">
           <form
            onSubmit={hundleSubmit} 
            className="max-w-md px-4 mx-auto mt-12">
            <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    onChange={hundleChange}
                    
                    type="text"
                    placeholder="nom prenom"
                    className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                />
            </div>
        </form>

        <div className="mt-10 md:mt-0">
                    <Link
                        href="/AddUser"
                        className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                    >
                        Ajouer un Athlete
                    </Link>
        </div>
     

        <div className="text-sm mt-12 overflow-x-auto">
          <ul
            rol="tablist"
            className="w-full border-b flex items-center gap-x-3 overflow-x-auto"
          >
            {tableItems.map((item, idx) => (
              <li
                key={idx}
                className={`py-2 border-b-2 ${
                  selectedItem == idx
                    ? "border-indigo-600 text-indigo-600"
                    : "border-white text-gray-500"
                }`}
              >
                <button
                  role="tab"
                  aria-selected={selectedItem == idx ? true : false}
                  aria-controls={`tabpanel-${idx + 1}`}
                  className="py-2.5 px-4 rounded-lg duration-150 hover:text-indigo-600 hover:bg-gray-50 active:bg-gray-100 font-medium"
                  onClick={() => setSelectedItem(idx)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <div>
              <table className="w-full table-auto text-left">
                <thead className="text-gray-600 font-medium border-b">
                <tr>
                    <td className="pr-6 py-4 whitespace-nowrap"><p>there are {tableItems[selectedItem].nbr}</p></td>
                </tr>
              
                  <tr>
                    <th className="w-9/12 py-4 pr-6">
                    users
                    </th>
              
                    <th className="py-4 pr-6">status</th>
                  </tr>
              
                </thead>
                <tbody className="text-gray-600 divide-y">
                  {tableItems[selectedItem].items.map((item, idx) => {
                     const isHighlighted = hasSearched && searchResult.includes(item)
                       return  <tr key={idx} className={isHighlighted ? `bg-yellow-200` : ""}>

              
                              {/* <td className="pr-6 py-4 whitespace-nowrap">{item.prop}</td> */}
                          
                                  <td className="pr-6 py-4 whitespace-nowrap text-indigo-600">
                                  <Link href={`${url}/user/${item._id}`}>
                                    {item.nom} {item.prenom}
                                    </Link>
                                  </td>
                           
                              <td className="pr-6 py-4 whitespace-nowrap">
                                <span
                                  className={`py-2 px-3 rounded-full font-semibold text-xs ${
                                    labelColors[item?.status]?.color || ""
                                  }`}
                                >
                                  {item.status}
                                </span>
                              </td>
              
                        </tr>
              
})}
                </tbody>
              </table>
          </div>
        </div>
      </div>
   </>
  )
}

export default MyTable