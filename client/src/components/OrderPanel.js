import { useContext } from "react"
import { OrderPanelContext } from "../context/orderpanel"
import "../css/orderpanel.css"
import { OrderContext } from "../context/order"


function OrderPanel() {
    const { selectedOrderId, setSelectedOrderId } = useContext(OrderPanelContext)
    const { orders } =  useContext(OrderContext)
    const { id, customer, phone, address, delivery_details, event, items} = orders.find(order => order.id === selectedOrderId)

    function statusUpdate() {
        console.log("Pop up saying: Mark items as... with the status of prepped or completed")
    }
    
    return (
        <div className="order-panel">
            <div>
                <button onClick={() => setSelectedOrderId(null)}>x</button>
                <button onClick={statusUpdate}>Mark as...</button>
                <h2>{customer}</h2>
                <h3>Delivery Details</h3>
                <span>Due <span>{event.event_date}</span></span>
                <table>
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
                {/* {item rendering} */}
            </div>
        </div>
    )
}

export default OrderPanel