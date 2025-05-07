import { useContext, useState } from "react"
import { OrderPanelContext } from "../context/orderpanel"
import { OrderContext } from "../context/order"
import ItemPanel from "./ItemPanel"
import StatusModal from "./StatusModal"
import "../styles/orderpanel.css"


function OrderPanel() {
    const [showModal, setShowModal] = useState(false)
    const { selectedOrderId, setSelectedOrderId } = useContext(OrderPanelContext)
    const { orders } =  useContext(OrderContext)
    const { id, customer, phone, address, delivery_details, event, items} = orders.find(order => order.id === selectedOrderId)

    function handleMarkStatus() {
        console.log("Pop up saying: Mark items as... with the status of prepped or completed")
        // patch logic for items in order
    }

    const itemElements = items.map(item => <ItemPanel key={item.id} item={item}/>)
    
    return (
        <div className="order-panel">
            <div>
                <button onClick={() => setSelectedOrderId(null)}>x</button>
                <button onClick={() => setShowModal(true)}>Mark as...</button>
                <h2>{customer}</h2>
                <h3>Delivery Details</h3>
                <span>Due <span>{event.event_date}</span></span>
                <table className="order-info-table">
                    <tbody>
                        <tr>
                            <td className="label">Customer</td>
                            <td>{customer}</td>
                        </tr>
                        <tr>
                            <td className="label">Phone</td>
                            <td>{phone}</td>
                        </tr>
                        <tr>
                            <td className="label">Deliver to</td>
                            <td>{address}</td>
                        </tr>
                        {delivery_details && (
                            <tr>
                                <td className="label">Delivery Details</td>
                                <td>{delivery_details}</td>
                            </tr>
                        )}
                        <tr>
                            <td className="label">Deliver by</td>
                            <td>{event.event_date}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <h3>{`Items (${items.length})`}</h3>
                {itemElements}
            </div>
            {showModal && <StatusModal onMarkStatus={handleMarkStatus} setShowModal={setShowModal}/>}
        </div>
    )
}

export default OrderPanel