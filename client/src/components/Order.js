import { useContext } from "react"
import { formatPhoneNumber, formatDate } from "../formatters"
import { OrderPanelContext } from "../context/orderpanel"

function Order({ order, onDeleteOrder }) {
    const { setSelectedOrderId } = useContext(OrderPanelContext)
    const { id, customer, phone, address, delivery_details, event, items } = order

    const itemImages = items.map(item => {
        return <img src={`/icons/${item.item_type}icon.png`} alt={item.item_type} className="icon-small"/>
    })

    return (
        <tr onClick={() => {setSelectedOrderId(id)}}>
            <td>{formatDate(event.event_date)}</td>
            <td>
                <div className="icon-row">
                    {itemImages}
                </div>
            </td>
            <td>{customer}</td>
            <td>{formatPhoneNumber(phone)}</td>
            <td>{address}</td>
            <td>{delivery_details}</td>
            {/* <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn" onClick={() => onDeleteOrder(id)}>Delete</button>
            </td> */}
        </tr>
    )
}

export default Order