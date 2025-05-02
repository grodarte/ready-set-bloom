import { useContext } from "react"
import { OrderContext } from "../context/order"
import Order from "./Order"
import "../styles/orders.css"

function Orders() {
    const { orders, setOrders } = useContext(OrderContext)

    const orderElements = orders.map(order=>{
        return <Order key={order.id} order={order} onDeleteOrder={handleDelete}/>
    })

    function handleEdit(order) {
        // side panel logic ?
        console.log("Edit order: ", order)
    }

    function handleDelete(id) {
        // fetch - delete order by id
        console.log(id)
        fetch(`/api/orders/${id}`, {
            method: 'DELETE'
        })
        .then(r => {
            if(r.ok) {
                setOrders(orders => orders.filter(order => order.id !== id))
            }
        })
    }

    return (
        <div className="orders-container">
            <h1 className="orders-heading">Orders</h1>
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Event Date</th>
                        <th>Items</th>
                        <th>Customer</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Delivery Details</th>
                        {/* <th style={{ color: '#aaa', fontWeight: 'normal' }}>⋯</th> */}

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