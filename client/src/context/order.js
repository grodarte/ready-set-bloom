import React, { useEffect, useState } from "react";
import { formatOrder } from "../formatters";

const OrderContext = React.createContext()

function OrderProvider({ children }) {
    const [orders, setOrders] = useState([])

    useEffect(()=>{
        fetch('/api/orders')
        .then(r=>r.json())
        .then(orderData=>{
            const formatted = orderData.map(formatOrder)
            setOrders(formatted)
        })
    }, [orders])

    return (
        <OrderContext.Provider value={{orders, setOrders}}>
            {children}
        </OrderContext.Provider>
    )
}

export { OrderContext, OrderProvider }