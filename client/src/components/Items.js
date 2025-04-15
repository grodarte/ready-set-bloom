import { useContext } from "react";
import { ItemContext } from "../context/item";

function Items() {
    const { items } = useContext(ItemContext)

    const itemElements = items.map(item=>{
        return <li key={item.id}>{item.item_type} for {item.order.name} on {item.order.event.name}</li>
    })

    return (
        <div>
            <h2>Items Component</h2>
            <ul>
                {itemElements}
            </ul>
        </div>
    )
}

export default Items