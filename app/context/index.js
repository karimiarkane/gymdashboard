'use client'
import { createContext , useState } from "react"
export  const refreshContext = createContext()

export function RefreshProvider({children}) {
    const [needToRefresh, setNeedToRefresh] = useState(false)

    return (
        <refreshContext.Provider value={{needToRefresh , setNeedToRefresh}}>
            {children}
        </refreshContext.Provider>
    )
}
