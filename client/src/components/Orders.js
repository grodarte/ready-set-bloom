import { useContext, useState } from "react"
import { OrderContext } from "../context/order"
import Order from "./Order"
import StatusFilter from "./StatusFilter"
import "../styles/orders.css"
import { DateContext } from "../context/DateContext"

function Orders() {
    const { orders, setOrders } = useContext(OrderContext)
    const { startOfWeek, endOfWeek, startOfNextWeek, endOfNextWeek } = useContext(DateContext)
    const [filter, setFilter] = useState("this_week")

    const filteredOrders = orders.filter(order => {
        if (filter === 'all') return true
        if (filter === 'active') return order.status !== "completed"
        if (filter === 'completed') return order.status === 'completed'
        if (filter === 'this_week') {
            const orderDate = new Date(order.event.event_date)
            return orderDate >= startOfWeek && orderDate <= endOfWeek
        }
    })

    const orderElements = filteredOrders.map(order=>{
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
            <StatusFilter currentFilter={filter} setFilter={setFilter}/>
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