import React, { useEffect, useState } from "react";
import { formatWristlet } from "../formatters";

const WristletContext = React.createContext()

function WristletProvider({ children }) {
    const [wristlets, setWristlets] = useState([])

    useEffect(()=>{
        fetch('/api/wristlets')
        .then(r=>r.json())
        .then(wristletData=>{
            const formatted = wristletData.map(formatWristlet)
            setWristlets(formatted)
        })
    }, [wristlets])

    return (
        <WristletContext.Provider value={{wristlets, setWristlets}}>
            {children}
        </WristletContext.Provider>
    )
}

export { WristletContext, WristletProvider }