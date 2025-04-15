

function Order({ order }) {
    const { id, name, phone, address, delivery_details, event, items } = order

    return (
        <tr>
            <td>{event.event_date}</td>
            <td>{name}</td>
            <td>{phone}</td>
            <td>{address}</td>
            <td>{delivery_details}</td>
        </tr>
    )
}

export default Order