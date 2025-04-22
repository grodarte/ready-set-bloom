import { useContext } from "react"
import { OrderContext } from "../context/order"
import Order from "./Order"
import "../css/orders.css"

function Orders() {
    const { orders } = useContext(OrderContext)

    const orderElements = orders.map(order=>{
        return <Order key={order.id} order={order}/>
    })

    return (
        <div className="orders-container">
            <h1 className="orders-heading">Orders</h1>
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Event Date</th>
                        <th>Customer</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Delivery Details</th>
                    </tr>
                </thead>
                <tbody>
                    {orderElements}
                </tbody>
            </table>
        </div>
    )
}

export default Orders