import React, { useEffect, useState } from "react";
import { formatItem } from "../formatters";

const ItemContext = React.createContext()

function ItemProvider({ children }) {
    const [items, setItems] = useState([])

    useEffect(()=>{
        fetch('/api/items')
        .then(r=>r.json())
        .then(itemData=>{
            const formatted = itemData.map(formatItem)
            setItems(formatted)
        })
    }, [])

    return (
        <ItemContext.Provider value={{items, setItems}}>
            {children}
        </ItemContext.Provider>
    )
}

export  { ItemContext, ItemProvider }