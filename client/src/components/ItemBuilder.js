import { Field, ErrorMessage, FieldArray, useFormikContext} from 'formik';
import { useContext } from 'react';
import { FlowerContext } from '../context/flower';
import { WristletContext } from '../context/wristlet';
import { AccentContext } from '../context/accent';

function ItemBuilder() {
    const { values, setFieldValue } = useFormikContext()
    const { flowers } = useContext(FlowerContext)
    const { wristlets } = useContext(WristletContext)
    const { accents } = useContext(AccentContext)

    return (
        <FieldArray name="items">
            {({ push, remove }) => (
                <div>
                    <h3>Add Items</h3>

                    {values.items.map((item, index) => {
                        const isBoutonniere = item.item_type?.toLowerCase() === "boutonniere"

                        return (
                            <div key={index}>
                                <div>
                                    <label htmlFor="item_type">Item Type</label>
                                    <Field
                                        as="select"
                                        name={`items[${index}].item_type`}
                                        onChange={(e) => {
                                            const value = e.target.value
                                            setFieldValue(`items[${index}].item_type`, value)
                                            if (value.toLowerCase() === "boutonniere") {
                                                setFieldValue(`items[${index}].wristlet_id`, "")
                                            }
                                        }}
                                    >
                                        <option value="">--Select Type--</option>
                                        <option value="corsage">Corsage</option>
                                        <option value="boutonniere">Boutonniere</option>
                                    </Field>
                                    <ErrorMessage name={`items[${index}].item_type`} component="div" style={{ color: "red" }}/>
                                </div>
                                {!isBoutonniere && (
                                    <div>
                                        <label htmlFor='wristlet_id'>Wristlet</label>
                                        <Field 
                                            as="select"
                                            name={`items[${index}].wristlet_id`}
                                            onChange={(e) => setFieldValue(`items[${index}].wristlet_id`, Number(e.target.value))} 
                                        >
                                            <option value="">--Select Wristlet--</option>
                                            {wristlets.map(wristlet=>(
                                                <option key={wristlet.id} value={wristlet.id}>
                                                    {wristlet.color} {wristlet.style}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name={`items[${index}].wristlet_id`} component="div" style={{ color: "red" }} />
                                    </div>
                                )}
                                <div>
                                    <label htmlFor="flower_id">Flower Color</label>
                                    <Field
                                        as="select"
                                        name={`items[${index}].flower_id`}
                                        onChange={(e) => setFieldValue(`items[${index}].flower_id`, Number(e.target.value))}
                                    >
                                        <option value="">--Select Flower--</option>
                                        {flowers.map(flower=>(
                                            <option key={flower.id} value={flower.id}>
                                                {flower.color}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name={`items[${index}].flower_id`} component="div" style={{ color: "red" }}/>
                                </div>
                                <div>
                                    <label htmlFor='ribbon_id'>Ribbon Color</label>
                                    <Field name={`items[${index}].ribbon_color`} />
                                    <ErrorMessage name={`items[${index}].ribbon_color`} component="div" style={{ color: "red" }}/>
                                </div>
                                <div>
                                    <label htmlFor="accent_id">Accent Ribbon</label>
                                    <Field
                                        as="select"
                                        name={`items[${index}].accent_id`}
                                        onChange={(e) => setFieldValue(`items[${index}].accent_id`, Number(e.target.value))}
                                    >
                                        <option value="">--Select accent--</option>
                                        {accents.map(accent=>(
                                            <option key={accent.id} value={accent.id}>
                                                {accent.color}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name={`items[${index}].accent_id`} component="div" style={{ color: "red" }}/>
                                </div>
                                <div>
                                    <label htmlFor='special_requests'>Special Requests</label>
                                    <Field as="textarea" name={`items[${index}].special_requests`} rows="1"/>
                                    <ErrorMessage name={`items[${index}].special_requests`} component="div" style={{ color: "red" }}/>
                                </div>

                                <button type="button" onClick={() => remove(index)}>
                                    Remove Item
                                </button>                                
                            </div>
                        )
                    })}
                    <button
                        type="button"
                        onClick={()=>
                            push({
                                item_type: '',
                                wristlet_id: '',
                                flower_id: '',
                                ribbon_color: '',
                                accent_id: '',
                                special_requests: ''
                            })
                        }
                    >
                        + Add Item
                    </button>
                </div>
            )}
        </FieldArray>
    )
}

export default ItemBuilder