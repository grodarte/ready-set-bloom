import { useContext, useState } from "react"
import { OrderPanelContext } from "../context/orderpanel"
import { OrderContext } from "../context/order"
import useInlineEdit from "../hooks/useInlineEdit"
import EditableField from "./EditableField"
import ItemPanel from "./ItemPanel"
import StatusModal from "./StatusModal"
import { formatItem } from "../formatters"
import "../styles/orderpanel.css"
import { ItemContext } from "../context/item"


function OrderPanel() {
    const [showStatusModal, setShowStatusModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const { orders } =  useContext(OrderContext)
    const { setItems } = useContext(ItemContext)
    const { selectedOrderId, setSelectedOrderId } = useContext(OrderPanelContext)
    const { id, customer, phone, address, delivery_details, event, items} = orders.find(order => order.id === selectedOrderId)
    const { isEditing, setIsEditing, editData, startEditing, cancelEditing, handleChange } = useInlineEdit({
        customer: customer,
        phone: phone,
        address: address,
        delivery_details: delivery_details,
    })

    function handleMarkStatus(status) {
        setShowStatusModal(false)
        console.log("Pop up saying: Mark items as... with the status of prepped or completed")
        items.forEach(item => {
            fetch(`/api/items/${item.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    item_status: status
                })
            })
            .then(r=> {
                if (!r.ok) throw new Error("Failed to update item status")
                return r.json()
            })
            .then(updatedItem => {
                const formattedItem = formatItem(updatedItem)
                setItems(prev => prev.map(item => {
                    if (item.id === formattedItem.id) {
                        return formattedItem
                    } else return item
                }))
                setIsEditing(false)

                // setSuccessMsg("Item updated successfully!")
                // window.scrollTo({ top: 0, behavior: 'smooth' })
                // setTimeout(()=> setSuccessMsg(""), 5000)
            })
            .catch(err => {
                console.error("Error updating item status:", err)
            })
        })
    }

    function handleSave() {
        // patch logic for order and items
    }

    const itemElements = items.map(item => <ItemPanel key={item.id} item={item}/>)
    
    return (
        <div className="order-panel">
            <div className="order-panel-header">
                <div className="order-panel-header-buttons">
                    <button className="panel-close-button" onClick={() => setSelectedOrderId(null)}>x</button>
                    <button onClick={() => setShowStatusModal(true)}>Mark as...</button>
                </div>
                <h2 className="order-customer-name">{customer}</h2>
            </div>
            <div className="order-panel-content">
                <h3>Delivery Details</h3>
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
                                {/* <td>{delivery_details}</td> */}
                                <td>
                                    <EditableField
                                        name='delivery_details'
                                        value={editData.delivery_details}
                                        isEditing={isEditing}
                                        onChange={handleChange}
                                    />
                                </td>
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
                            <button className="save-button" onClick={handleSave}>Save</button>
                            <button className="cancel-button" onClick={cancelEditing}>Cancel</button>
                        </>
                    ) : (
                        <button className="edit-button" onClick={startEditing}>Edit Order Details</button>
                    )}
                </div>
                <h3>{`Items (${items.length})`}</h3>
                {itemElements}
                <button onClick={()=>setShowDeleteModal(true)}>DELETE ORDER</button>
            </div>
            {showStatusModal && <StatusModal onMarkStatus={handleMarkStatus} setShowStatusModal={setShowStatusModal}/>}
        </div>
    )
}

export default OrderPanel