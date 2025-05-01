

function ItemPanel({ item }) {
    const { id, item_type, item_status, ribbon_color, special_requests, wristlet, flower, accent } = item

    return (
        <div>
            <h4>{item_type}</h4>
            <p>{item_status}</p>
            
            {wristlet && (
                <p>Wristlet: {wristlet.color}</p>
            )}
            <p>Flower: {flower.color}</p>
            <p>Ribbon: {ribbon_color}</p>
            <p>Accent: {accent ? accent.color : "-"}</p>
            {special_requests && (
                <p>Special Request: {special_requests}</p>
            )}
        </div>
    )
}

export default ItemPanel