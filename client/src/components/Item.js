

function Item({ item }) {
    const { id, item_status, order, item_type, wristlet, ribbon, flower, accent, special_requests} = item

    return (
        <tr>
            <td>{order.event.event_date}</td>
            <td>{item_status}</td>
            <td>{order.name}</td>
            <td>{item_type}</td>
            <td>{wristlet?.color}</td>
            <td>{flower.color}</td>
            <td>{ribbon.color}</td>
            <td>{accent?.color}</td>
            <td>{special_requests}</td>
        </tr>
    )
}

export default Item