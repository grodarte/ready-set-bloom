import { useContext } from "react"
import { formatDate } from "../formatters"
import { OrderPanelContext } from "../context/orderpanel"

function Item({ item }) {
    const { id, item_status, order, event, item_type, wristlet, ribbon_color, flower, accent, special_requests} = item
    const { setSelectedOrderId} = useContext(OrderPanelContext)

    const statusClass = {
        new: "status-new",
        prepped: "status-prepped",
        completed: "status-completed"
    }[item_status?.toLowerCase()] || ""

    return (
        <tr onClick={() => setSelectedOrderId(order.id)}>
            <td>{formatDate(order?.event?.event_date)}</td>
            <td className={statusClass}>{item_status}</td>
            <td>{order?.customer}</td>
            <td>{item_type}</td>
            <td>{wristlet?.color}</td>
            <td>{flower?.color}</td>
            <td>{ribbon_color}</td>
            <td>{accent?.color}</td>
            <td>{special_requests}</td>
        </tr>
    )
}

export default Item