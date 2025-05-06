import { useContext, useState } from "react";
import { ItemContext } from "../context/item";
import { DateContext } from "../context/DateContext";
import Item from "./Item";
import StatusFilter from "./StatusFilter";
import "../styles/items.css";

function Items() {
    const { items } = useContext(ItemContext)
    const { startOfWeek, endOfWeek } = useContext(DateContext)
    const [filter, setFilter] = useState("this_week")

    const filteredItems = items.filter(item => {
        if (filter === 'all') return true
        if (filter === 'active') return item.order.status !== "completed"
        if (filter === 'completed') return item.order.status === 'completed'
        if (filter === 'this_week') {
            const itemDate = new Date(item.order.event.event_date)
            return itemDate >= startOfWeek && itemDate <= endOfWeek
        }
    })
    
    if (!items) return <p>Loading items...</p>
    
    const itemElements = filteredItems.map(item=>{
        return <Item key={item.id} item={item}/>
    })
    
    return (
        <div className="items-container">
            <h1 className="items-heading">Items</h1>
            <StatusFilter currentFilter={filter} setFilter={setFilter}/>
            <table className="items-table">
                <thead>
                    <tr>
                        <th>Event Date</th>
                        <th>Status</th>
                        <th>Customer</th>
                        <th>Type</th>
                        <th>Wristlet</th>
                        <th>Flower</th>
                        <th>Ribbon</th>
                        <th>Accent</th>
                        <th>Special Requests</th>
                    </tr>
                </thead>
                <tbody>
                    {itemElements}
                </tbody>
            </table>
        </div>
    )
}

export default Items