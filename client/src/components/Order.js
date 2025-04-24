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
        </tr>
    )
}

export default Order