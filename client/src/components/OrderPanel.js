import { useContext, useState } from "react"
import { OrderPanelContext } from "../context/orderpanel"
import { OrderContext } from "../context/order"
import useInlineEdit from "../hooks/useInlineEdit"
import EditableField from "./EditableField"
import ItemPanel from "./ItemPanel"
import StatusModal from "./StatusModal"
import { formatItem, formatOrder } from "../formatters"
import "../styles/orderpanel.css"
import { ItemContext } from "../context/item"


function OrderPanel() {
    const [showStatusModal, setShowStatusModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const { orders, setOrders } =  useContext(OrderContext)
    const { items, setItems } = useContext(ItemContext)
    const { selectedOrderId, setSelectedOrderId } = useContext(OrderPanelContext)
    const selectedOrder = orders.find(order => order.id === selectedOrderId)    
    const { id, customer, phone, address, delivery_details, event} = selectedOrder
    const filteredItems = items.filter(item => item.order_id === selectedOrderId)
    const { isEditing, setIsEditing, editData, startEditing, cancelEditing, handleChange } = useInlineEdit({
        customer: customer,
        phone: phone,
        address: address,
        delivery_details: delivery_details,
    })
    
    function handleMarkStatus(status) {
        setShowStatusModal(false)
        filteredItems.forEach(item => {
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
                
            })
            .catch(err => {
                console.error("Error updating item status:", err)
            })
        })
    }

    function handleSaveOrder() {
        const cleanedPhone = editData.phone.replace(/\D/g, "")

        const updatedOrder = {
            customer: editData.customer,
            phone: cleanedPhone,
            address: editData.address,
            delivery_details: editData.delivery_details
        }

        fetch(`/api/orders/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedOrder)
        })
        .then(r => {
            if (!r.ok) throw new Error("Failed to updated order")
            return r.json()
        })
        .then(updatedOrder => {
            const formattedOrder = formatOrder(updatedOrder)
            setOrders(prev => prev.map(order => order.id === updatedOrder.id ? formattedOrder : order))
            setItems(prev => prev.map(item => item.order_id === updatedOrder.id ? {...item, order: formattedOrder} : item))
            setIsEditing(false)
        })
        .catch(err => console.error("Error updating order:", err))
    }

    function handleDeleteOrder() {
        fetch(`/api/orders/${id}`, {
            method: "DELETE"
        }).then(r=> {
            if (r.ok) {
                setSelectedOrderId(null)
                setOrders(orders => orders.filter(order => order.id !== id))
                setItems(items => items.filter(item => item.order_id !== id))
            }
        })
    }

    const itemElements = filteredItems.map(item => <ItemPanel key={item.id} item={item}/>)
    
    return (
        <div className="order-panel">
            {showDeleteModal ? (
                    <div className="modal-backdrop">
                        <div className="modal-content">
                            <h3 className="modal-heading">Are you sure you want to delete this order?</h3>
                            <h4>All associated items will also be deleted.</h4>
                            <div className="modal-buttons">
                                <button style={{ color: "red" }} onClick={handleDeleteOrder}>DELETE</button>
                                <button className="cancel" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
            ) : (
                null
            )}
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
                        <tr>
                            <td className="label">Delivery Details</td>
                            <td>
                                <EditableField
                                    name='delivery_details'
                                    value={editData.delivery_details}
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="label">Deliver by</td>
                            <td>{event.event_date}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="order-panel-footer">
                    {isEditing ? (
                        <>
                            <button className="save-button" onClick={handleSaveOrder}>Save</button>
                            <button className="cancel-button" onClick={cancelEditing}>Cancel</button>
                        </>
                    ) : (
                        <button className="edit-button" onClick={startEditing}>Edit Order Details</button>
                    )}
                </div>
                <h3>{`Items (${filteredItems.length})`}</h3>
                {itemElements}
                <button onClick={()=>setShowDeleteModal(true)}>DELETE ORDER</button>
            </div>
            {showStatusModal && <StatusModal onMarkStatus={handleMarkStatus} setShowStatusModal={setShowStatusModal}/>}
        </div>
    )
}

export default OrderPanel