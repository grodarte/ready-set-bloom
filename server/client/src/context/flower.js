import React, { useEffect, useState } from "react";

const FlowerContext = React.createContext()

function FlowerProvider({ children }) {
    const [flowers, setFlowers] = useState([])

    useEffect(()=>{
        fetch('/api/flowers')
        .then(r=>r.json())
        .then(flowerData=>{
            setFlowers(flowerData)
        })
    }, [])

    return (
        <FlowerContext.Provider value={{flowers, setFlowers}}>
            {children}
        </FlowerContext.Provider>
    )
}

export { FlowerContext, FlowerProvider }