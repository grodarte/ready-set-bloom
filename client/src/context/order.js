import React, { useEffect, useState } from "react";

const OrderContext = React.createContext()

function OrderProvider({ children }) {
    const [orders, setOrders] = useState([])

    useEffect(()=>{
        fetch('/api/orders')
        .then(r=>r.json())
        .then(orderData=>{
            setOrders(orderData)
        })
    }, [])

    return (
        <OrderContext.Provider value={{orders, setOrders}}>
            {children}
        </OrderContext.Provider>
    )
}

export { OrderContext, OrderProvider }