import { formatPhoneNumber, formatDate } from "../formatters"

function Order({ order, onDeleteOrder }) {
    const { id, customer, phone, address, delivery_details, event, items } = order

    const itemImages = items.map(item => {
        return <img src={`/icons/${item.item_type}icon.png`} alt={item.item_type} className="icon-small"/>
    })

    return (
        <tr>
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
            <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn" onClick={() => onDeleteOrder(id)}>Delete</button>
            </td>
        </tr>
    )
}

export default Order