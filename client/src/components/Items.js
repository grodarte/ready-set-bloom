import { useContext } from "react";
import { ItemContext } from "../context/item";
import Item from "./Item";
import "../css/items.css";

function Items() {
    const { items } = useContext(ItemContext)

    
    if (!items) return <p>Loading items...</p>
    
    const itemElements = items.map(item=>{
        return <Item key={item.id} item={item}/>
    })
    
    return (
        <div className="items-container">
            <h1 className="items-heading">Items</h1>
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