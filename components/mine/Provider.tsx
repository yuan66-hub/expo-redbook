

import { createContext, ReactNode, useState } from "react";

export const MineContext = createContext(null)

export default function Provider({ children }:{ children:ReactNode }){
    const [tabIndex,setTabIndex] = useState<number>(0)
  return (
    <MineContext.Provider value={{
        tabIndex,
        setTabIndex
    } as any}>
       {children}
    </MineContext.Provider>
  )
}