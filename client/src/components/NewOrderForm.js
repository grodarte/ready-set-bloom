import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useContext, useState } from 'react';
import { DateContext} from '../context/DateContext'
import { OrderContext } from '../context/order';
import { ItemContext } from '../context/item';
import { EventContext } from '../context/event';
import ItemBuilder from './ItemBuilder';
import { formatDate, formatOrder, formatItem } from '../formatters';
import "../styles/neworderform.css"

function NewOrderForm() {
    const { startOfWeek } = useContext(DateContext)
    const { setOrders } = useContext(OrderContext)
    const { setItems } = useContext(ItemContext)
    const { events } = useContext(EventContext)
    const [successMsg, setSuccessMsg] = useState("")

    const orderSchema = yup.object().shape({
        customer: yup.string().required("Required"),
        phone: yup.string().required("Required").matches(/^1?\d{10}$/, "Phone number must be 10 digits (optionally starting with a 1)"),
        address: yup.string().required("Required"),
        delivery_details: yup.string(),
        event_id: yup.number().typeError("Must select an event").required("Required"),
        items: yup.array()
        .of(
            yup.object().shape({
                item_type: yup
                    .string()
                    .typeError("Must select an item type")
                    .required('Required')
                    .oneOf(["corsage", "boutonniere", "bouquet"]),
                flower_id: yup
                    .number()
                    .typeError("Must select a flower")
                    .required('Required'),
                wristlet_id: yup
                    .number()
                    .nullable()
                    .when("item_type", {
                        is:"corsage", 
                        then: (schema) => schema
                            .typeError("Must select a wristlet")
                            .required("Required for corsages"),  
                        otherwise: (schema) => schema.notRequired().nullable(),}),
                ribbon_color: yup
                    .string()
                    .typeError("Must select a ribbon color")
                    .required('Required'),
                accent_id: yup
                    .number()
                    .nullable(),
                special_requests: yup
                    .string()
            })
        )
        .min(1, "You must add at least one item")
    })

    function handleSubmit(values, { resetForm }) {
        fetch('/api/orders/full', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        })
        .then(r=>{
            if (!r.ok) throw new Error("Failed to create order")
            return r.json()
        })
        .then(newOrderData=> {
            const formattedOrder = formatOrder(newOrderData.order)
            const formattedItems = newOrderData.items.map(item => formatItem(item))
            setOrders(orders=>[...orders, formattedOrder])
            setItems(items=>[...items, ...formattedItems])

            resetForm()
            setSuccessMsg("Order created successfully!")
            window.scrollTo({ top: 0, behavior: 'smooth' })
            setTimeout(()=> setSuccessMsg(""), 5000)
        })
        .catch(err => {
            console.error("Error submitting order and items:", err)
        })
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
                <>
                    {successMsg && (
                        <div className='success-message'>
                            {successMsg}
                        </div>
                    )}
                    <Form className='order-form-container'>
                        <h2 className='order-form-title'>New Order</h2>

                        <div className='form-section'>
                            <h3>Customer Info</h3>

                            <div className='form-group'>
                                <label htmlFor="customer">Customer Name</label>
                                <Field name="customer"/>
                                <ErrorMessage name="customer" component="div" className='error'/>
                            </div>
                        </div>
                        <div className='form-section'>
                            <div className='form-group'>
                                <label htmlFor="phone">Customer Phone</label>
                                <Field name="phone"/>
                                <ErrorMessage name="phone" component="div" className='error'/>
                            </div>
                        </div>  
                        <div className='form-section'>
                            <div className='form-group'>
                                <label htmlFor="address">Customer Address</label>
                                <Field name="address"/>
                                <ErrorMessage name="address" component="div" className='error'/>
                            </div>
                        </div>     
                        <div className='form-section'>
                            <div className='form-group'>
                                <label htmlFor="delivery_details">Delivery Instructions</label>
                                <Field name="delivery_details"/>
                                <ErrorMessage name="delivery_details" component="div" className='error'/>
                            </div>
                        </div>   
                        <div className='form-section'>
                            <h3>Event</h3>
                            <div className='form-group'>
                                <label htmlFor="event_id"></label>
                                <Field 
                                    as="select"
                                    name="event_id"
                                    onChange={(e)=> setFieldValue("event_id", Number(e.target.value))}
                                >
                                    <option value="">Select Event</option>
                                    {events.filter(event => {
                                            const eventDate = new Date(event.event_date)
                                            return eventDate >= startOfWeek
                                        }).map(event=>(
                                        <option key={event.id} value={event.id}>
                                            {formatDate(event?.event_date)} | {event.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="event_id" component="div" className='error'/>
                            </div>
                        </div>     
                        <ItemBuilder />
                        <button type="submit">Submit Order</button>                                                                   
                    </Form>
                </>
            )}
        </Formik>
    )
}

export default NewOrderForm