import { useContext } from "react"
import { OrderPanelContext } from "../context/orderpanel"
import "../css/orderpanel.css"


function OrderPanel() {
    const { selectedOrderId, setShowOrderPanel } = useContext(OrderPanelContext)
    // logic to get order
    // component for items to render
    return (
        <div className="order-panel">
            <div>
                <h2>Order Panel</h2>
                <button onClick={() => setShowOrderPanel(false)}>x</button>
            </div>
        </div>
    )
}

export default OrderPanel