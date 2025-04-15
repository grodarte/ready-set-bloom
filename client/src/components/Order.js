

function Order({ order }) {
    const { id, customer, phone, address, delivery_details, event, items } = order

    return (
        <tr>
            <td>{event.event_date}</td>
            <td>{customer}</td>
            <td>{phone}</td>
            <td>{address}</td>
            <td>{delivery_details}</td>
        </tr>
    )
}

export default Order