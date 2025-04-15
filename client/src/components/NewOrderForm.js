import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useContext } from 'react';
import { OrderContext } from '../context/order';
import { EventContext } from '../context/event'

function NewOrderForm() {
    const { orders, setOrders } = useContext(OrderContext)
    const { events, setEvents } = useContext(EventContext)

    const orderSchema = yup.object().shape({
        customer: yup.string().required("Required"),
        phone: yup.string().required("Required").matches(/^1?\d{10}$/, "Phone number must be 10 digits (optionally starting with a 1)"),
        address: yup.string().required("Required"),
        delivery_details: yup.string(),
        event_id: yup.number().required("Required"), // .typeError("Must select an event") before required
        items: yup.array()
        .of(
            yup.object().shape({
                item_type: yup.string().required('Required'),
                flower_id: yup.number().required('Required'),
                wristlet_id: yup.number(),
                ribbon_color: yup.string().required('Required'),
                accent_id: yup.number(),
                special_requests: yup.string()
            })
        )
        .min(1, "You must add at least one item")
    })

    function handleSubmit(values) {
        console.log("Submitting order...")
        fetch('/api/orders', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        })
        .then(r=>r.json())
        .then(newOrder => {
            // sets new order in global state 
        })
        // post item(s) as well
    }

    const initialValues = {
            customer: "",
            phone: "",
            address: "",
            delivery_details: "",
            event_id: "",
            items: []
        }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={orderSchema}
            onSubmit={handleSubmit}
        >
            {({ values, setFieldValue }) => (
                <Form>
                    <div>
                        <label for="customer">Customer Name</label>
                        <Field name="customer"/>
                        <ErrorMessage name="customer" component="div" style={{ color: "red" }}/>
                    </div>
                    <div>
                        <label for="phone">Customer Phone</label>
                        <Field name="phone"/>
                        <ErrorMessage name="phone" component="div" style={{ color: "red" }}/>
                    </div>  
                    <div>
                        <label for="address">Customer Address</label>
                        <Field name="address"/>
                        <ErrorMessage name="address" component="div" style={{ color: "red" }}/>
                    </div>     
                    <div>
                        <label for="delivery_details">Delivery Instructions</label>
                        <Field name="delivery_details"/>
                        <ErrorMessage name="delivery_details" component="div" style={{ color: "red" }}/>
                    </div>   
                    <div>
                        <label for="event_id">Event</label>
                        <Field 
                            as="select"
                            name="event_id"
                            onChange={(e)=> setFieldValue("event_id", Number(e.target.value))}
                        >
                            <option value="">--Select an event--</option>
                            {events.map(event=>(
                                <option key={event.id} value={event.id}>
                                    {event.event_date} | {event.name}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="event_id" component="div" style={{ color: "red" }}/>
                    </div>     
                    <button type="submit">Submit Order</button>                                                                   
                </Form>
            )}
        </Formik>
    )
    
    // return (
    //     <div>
    //         <h1>Add New Order</h1>
    //         <h2>Customer Info</h2>
    //         <form onSubmit={formik.handleSubmit}>
    //             <label for="customer">Customer Name</label>
    //             <input 
    //                 id="customer"
    //                 name="customer"
    //                 type="text"
    //                 onChange={formik.handleChange}
    //                 value={formik.values.customer}
    //             />
    //             <p style={{ color: "red" }}>{formik.errors.customer}</p>
    //             <label for="phone">Customer Phone</label>
    //             <input 
    //                 id="phone"
    //                 name="phone"
    //                 type="text"
    //                 onChange={formik.handleChange}
    //                 value={formik.values.phone}
    //             />
    //             <p style={{ color: "red" }}>{formik.errors.phone}</p> 
    //             <label for="address">Customer Address</label>
    //             <input 
    //                 id="address"
    //                 name="address"
    //                 type="text"
    //                 onChange={formik.handleChange}
    //                 value={formik.values.address}
    //             />
    //             <p style={{ color: "red" }}>{formik.errors.address}</p>    
    //             <label for="delivery_details">Delivery Instructions</label>
    //             <input 
    //                 id="delivery_details"
    //                 name="delivery_details"
    //                 type="text"
    //                 onChange={formik.handleChange}
    //                 value={formik.values.delivery_details}
    //             />
    //             <p style={{ color: "red" }}>{formik.errors.delivery_details}</p>                                            
    //         </form>

    //     </div>
    // )
}

export default NewOrderForm