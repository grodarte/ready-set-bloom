import { useContext } from "react"
import { OrderContext } from "../context/order"

function Orders() {
    const { orders } = useContext(OrderContext)

    const orderElements = orders.map(order=>{
        return <li key={order.id}> Order for {order.name} on {order.event.event_date} at {order.address}</li>
    })

    return (
        <div>
            <h2>Orders Component</h2>
            <ul>
                {orderElements}
            </ul>
        </div>
    )
}

export default Orders