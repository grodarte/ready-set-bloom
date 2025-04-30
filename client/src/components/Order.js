import { formatPhoneNumber, formatDate } from "../formatters"

function Order({ order }) {
    const { id, customer, phone, address, delivery_details, event, items } = order

    return (
        <tr>
            <td>{formatDate(event.event_date)}</td>
            <td>{customer}</td>
            <td>{formatPhoneNumber(phone)}</td>
            <td>{address}</td>
            <td>{delivery_details}</td>
            <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
            </td>
        </tr>
    )
}

export default Order