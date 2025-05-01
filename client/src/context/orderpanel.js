import React, { useState } from "react";

const OrderPanelContext = React.createContext()

function OrderPanelProvider({ children }) {
    // const [showOrderPanel, setShowOrderPanel] = useState(false)
    const [selectedOrderId, setSelectedOrderId] = useState(null)  

    return (
        <OrderPanelContext.Provider value={{selectedOrderId, setSelectedOrderId}}>
            {children}
        </OrderPanelContext.Provider>
    )
}

export { OrderPanelContext, OrderPanelProvider }