import React, { useEffect, useState } from "react";
import { formatAccent } from "../formatters";

const AccentContext = React.createContext()

function AccentProvider({ children }) {
    const [accents, setAccents] = useState([])

    useEffect(()=>{
        fetch('/api/accents')
        .then(r=>r.json())
        .then(accentData=>{
            const formatted = accentData.map(formatAccent)
            setAccents(formatted)
        })
    }, [accents])

    return (
        <AccentContext.Provider value={{accents, setAccents}}>
            {children}
        </AccentContext.Provider>
    )
}

export { AccentContext, AccentProvider }