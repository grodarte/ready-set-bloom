import { useContext } from "react"
import { OrderPanelContext } from "../context/orderpanel"
import "../css/orderpanel.css"
import { OrderContext } from "../context/order"


function OrderPanel() {
    const { selectedOrderId, setSelectedOrderId } = useContext(OrderPanelContext)
    const { orders } =  useContext(OrderContext)

    const selectedOrder = orders.find(order => order.id === selectedOrderId)
    // logic to get order
    // component for items to render
    return (
        <div className="order-panel">
            <div>
                <h2>Order Panel</h2>
                <button onClick={() => setSelectedOrderId(null)}>x</button>
            </div>
        </div>
    )
}

export default OrderPanel