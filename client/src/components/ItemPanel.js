import { useContext } from "react"
import EditableField from "./EditableField"
import useInlineEdit from "../hooks/useInlineEdit"
import { WristletContext } from "../context/wristlet"
import { FlowerContext } from "../context/flower"
import { AccentContext } from "../context/accent"
import "../styles/itempanel.css"

function ItemPanel({ item }) {
    const { wristlets } = useContext(WristletContext)
    const { flowers } = useContext(FlowerContext)
    const { accents } = useContext(AccentContext)
    const { id, item_type, item_status, ribbon_color, special_requests, wristlet, flower, accent } = item
    const { isEditing, editData, startEditing, cancelEditing, handleChange } = useInlineEdit({
        wristlet_id: wristlet?.id || null,
        flower_id: flower?.id || null,
        accent_id: accent?.id || null,
        ribbon_color: ribbon_color,
        special_requests: special_requests
    })

    function handleSave() {
        // patch logic for items
    }

    function handleDelete() {
        // delete logic for items
    }

    return (
        <div className="item-panel">
                <button>⋮</button>
                <h4 className="item-title">{item_type}</h4>
                <p className="item-status">{item_status}</p>
                <table className="item-info-table">
                    <tbody>
                        { wristlet && (<tr>
                            <td className="label">Wristlet: </td>
                            <td>
                                <EditableField
                                    name='wristlet_id'
                                    value={editData.wristlet_id}
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                    options={wristlets.map(w => ({ id: w.id, name: w.color }))}
                                    useId={true}
                                />
                            </td>
                        </tr>)}
                        <tr>
                            <td className="label">Flower: </td>
                            <td>
                                <EditableField
                                    name='flower_id'
                                    value={editData.flower_id}
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                    options={flowers.map(f => ({ id: f.id, name: f.color }))}
                                    useId={true}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="label">Ribbon: </td>
                            <td>
                                <EditableField
                                    name='ribbon_color'
                                    value={editData.ribbon_color}
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="label">Accent: </td>
                            <td>
                                <EditableField
                                    name='accent_id'
                                    value={editData.accent_id}
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                    options={accents.map(a => ({ id: a.id, name: a.color }))}
                                    useId={true}
                                />
                            </td>
                        </tr>
                        { special_requests && (<tr>
                            <td className="label">Special Requests: </td>
                            <td>
                                <EditableField
                                    name='special_requests'
                                    value={editData.special_requests}
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>)}
                    </tbody>
                </table>
                <div className="item-panel-footer">
                    {isEditing ? (
                        <>
                            <button className="save-button" onClick={handleSave}>Save</button>
                            <button className="cancel-button" onClick={cancelEditing}>Cancel</button>
                        </>
                    ) : (
                        <button className="edit-button" onClick={startEditing}>Edit Item</button>
                    )}
                </div>
        </div>
    )
}

export default ItemPanel