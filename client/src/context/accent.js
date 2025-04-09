import React, { useEffect, useState } from "react";

const AccentContext = React.createContext()

function AccentProvider({ children }) {
    const [accents, setAccents] = useState([])

    useEffect(()=>{
        fetch('/api/accents')
        .then(r=>r.json())
        .then(accentData=>{
            setAccents(accentData)
        })
    }, [])

    return (
        <AccentContext.Provider value={{accents, setAccents}}>
            {children}
        </AccentContext.Provider>
    )
}

export { AccentContext, AccentProvider }