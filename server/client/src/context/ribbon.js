// import React, { useEffect, useState } from "react";

// const RibbonContext = React.createContext()

// function RibbonProvider({ children }) {
//     const [ribbons, setRibbons] = useState([])

//     useEffect(()=>{
//         fetch('/api/ribbons')
//         .then(r=>r.json())
//         .then(ribbonData=>{
//             setRibbons(ribbonData)
//         })
//     }, [])

//     return (
//         <RibbonContext.Provider value={{ribbons, setRibbons}}>
//             {children}
//         </RibbonContext.Provider>
//     )
// }

// export { RibbonContext, RibbonProvider }