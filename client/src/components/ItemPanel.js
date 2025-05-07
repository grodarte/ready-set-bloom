import { useContext } from "react"
import EditableField from "./EditableField"
import useInlineEdit from "../hooks/useInlineEdit"
import { WristletContext } from "../context/wristlet"
import { FlowerContext } from "../context/flower"
import { AccentContext } from "../context/accent"

function ItemPanel({ item }) {
    const { wristlets } = useContext(WristletContext)
    const { flowers } = useContext(FlowerContext)
    const { accents } = useContext(AccentContext)
    const { id, item_type, item_status, ribbon_color, special_requests, wristlet, flower, accent } = item
    const { isEditing, editData, startEditing, cancelEditing, handleChange } = useInlineEdit({
        wristlet_id: wristlet.id,
        flower_id: flower.id,
        accent_id: accent.id,
        ribbon_color: ribbon_color,
        special_requests: special_requests
    })

    function handleSave() {
        // patch logic for order and items
    }

    return (
        <div className="item-panel">
            <h4>{item_type}</h4>
            <p>{item_status}</p>
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
                        { (special_requests && isEditing) && (<tr>
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
                            <button onClick={handleSave}>Save</button>
                            <button onClick={cancelEditing}>Cancel</button>
                        </>
                    ) : (
                        <button onClick={startEditing}>Edit Item</button>
                    )}
                </div>
        </div>
    )
}

export default ItemPanel