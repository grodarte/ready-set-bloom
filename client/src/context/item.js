import React, { useEffect, useState } from "react";

const ItemContext = React.createContext()

function ItemProvider({ children }) {
    const [items, setItems] = useState([])

    useEffect(()=>{
        fetch('/api/items')
        .then(r=>r.json())
        .then(itemData=>{
            setItems(itemData)
        })
    }, [])

    return (
        <ItemContext.Provider value={{items, setItems}}>
            {children}
        </ItemContext.Provider>
    )
}

export  { ItemContext, ItemProvider }