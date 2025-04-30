import { useContext } from "react"
import { OrderContext } from "../context/order"
import Order from "./Order"
import "../css/orders.css"

function Orders() {
    const { orders } = useContext(OrderContext)

    const orderElements = orders.map(order=>{
        return <Order key={order.id} order={order}/>
    })

    function handleEdit(order) {
        // side panel logic ?
        console.log("Edit order: ", order)
    }

    function handleDelete(id) {
        // fetch - delete order by id
        console.log(id)
    }

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
                        <th style={{ color: '#aaa', fontWeight: 'normal' }}>⋯</th>

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