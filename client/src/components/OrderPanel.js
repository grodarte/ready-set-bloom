import { useContext, useState } from "react"
import { OrderPanelContext } from "../context/orderpanel"
import { OrderContext } from "../context/order"
import useInlineEdit from "../hooks/useInlineEdit"
import EditableField from "./EditableField"
import ItemPanel from "./ItemPanel"
import StatusModal from "./StatusModal"
import "../styles/orderpanel.css"


function OrderPanel() {
    const [showModal, setShowModal] = useState(false)
    const { orders } =  useContext(OrderContext)
    const { selectedOrderId, setSelectedOrderId } = useContext(OrderPanelContext)
    const { id, customer, phone, address, delivery_details, event, items} = orders.find(order => order.id === selectedOrderId)
    const { isEditing, editData, startEditing, cancelEditing, handleChange } = useInlineEdit({
        customer: customer,
        phone: phone,
        address: address,
        delivery_details: delivery_details,
    })

    //FIX clicking a different order and order info not updating

    function handleMarkStatus() {
        console.log("Pop up saying: Mark items as... with the status of prepped or completed")
        // patch logic for items in order
    }

    function handleSave() {
        // patch logic for order and items
    }

    const itemElements = items.map(item => <ItemPanel key={item.id} item={item}/>)
    
    return (
        <div className="order-panel">
            <div className="order-panel-content">
                <button onClick={() => setSelectedOrderId(null)}>x</button>
                <button onClick={() => setShowModal(true)}>Mark as...</button>
                <h2>{customer}</h2>
                <h3>Delivery Details</h3>
                <span>Due <span>{event.event_date}</span></span>
                <table className="order-info-table">
                    <tbody>
                        <tr>
                            <td className="label">Customer</td>
                            <td>
                                <EditableField
                                    name='customer'
                                    value={editData.customer}
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="label">Phone</td>
                            <td>
                                <EditableField
                                    name='phone'
                                    value={editData.phone}
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="label">Deliver to</td>
                            <td>
                                <EditableField
                                    name='address'
                                    value={editData.address}
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        {delivery_details && (
                            <tr>
                                <td className="label">Delivery Details</td>
                                <td>{delivery_details}</td>
                            </tr>
                        )}
                        <tr>
                            <td className="label">Deliver by</td>
                            <td>{event.event_date}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="order-panel-footer">
                    {isEditing ? (
                        <>
                            <button onClick={handleSave}>Save</button>
                            <button onClick={cancelEditing}>Cancel</button>
                        </>
                    ) : (
                        <button onClick={startEditing}>Edit Order Details</button>
                    )}
                </div>
                <div>
                    <h3>{`Items (${items.length})`}</h3>
                    {itemElements}
                </div>
            </div>
            {showModal && <StatusModal onMarkStatus={handleMarkStatus} setShowModal={setShowModal}/>}
        </div>
    )
}

export default OrderPanel