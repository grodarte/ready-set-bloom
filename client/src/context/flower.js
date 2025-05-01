import React, { useEffect, useState } from "react";
import { formatFlower } from "../formatters";

const FlowerContext = React.createContext()

function FlowerProvider({ children }) {
    const [flowers, setFlowers] = useState([])

    useEffect(()=>{
        fetch('/api/flowers')
        .then(r=>r.json())
        .then(flowerData=>{
            const formatted = flowerData.map(formatFlower)
            setFlowers(formatted)
        })
    }, [])

    return (
        <FlowerContext.Provider value={{flowers, setFlowers}}>
            {children}
        </FlowerContext.Provider>
    )
}

export { FlowerContext, FlowerProvider }