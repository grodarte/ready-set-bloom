import React, { useEffect, useState } from "react";

const WristletContext = React.createContext()

function WristletProvider({ children }) {
    const [wristlets, setWristlets] = useState([])

    useEffect(()=>{
        fetch('/api/wristlets')
        .then(r=>r.json())
        .then(wrisletData=>{
            setWristlets(wrisletData)
        })
    }, [])

    return (
        <WristletContext.Provider value={{wristlets, setWristlets}}>
            {children}
        </WristletContext.Provider>
    )
}

export { WristletContext, WristletProvider }