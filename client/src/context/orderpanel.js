import React, { useState } from "react";

const OrderPanelContext = React.createContext()

function OrderPanelProvider({ children }) {
    const [showOrderPanel, setShowOrderPanel] = useState(false)
    const [selectedOrderId, setSelectedOrderId] = useState({})

    return (
        <OrderPanelContext.Provider value={{showOrderPanel, setShowOrderPanel, selectedOrderId, setSelectedOrderId}}>
            {children}
        </OrderPanelContext.Provider>
    )
}

export { OrderPanelContext, OrderPanelProvider }