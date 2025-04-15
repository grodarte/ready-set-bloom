import { useFormik } from 'formik';
import * as yup from 'yup';

function NewOrderForm() {

    const orderSchema = yup.object().shape({
        customer: yup.string().required("Required"),
        phone: yup.string().required("Required").matches(/^1?\d{10}$/, "Phone number must be 10 digits (optionally starting with a 1)"),
        address: yup.string().required("Required"),
        delivery_details: yup.string(),
        event_id: yup.number().required("Required") // .typeError("Must select an event") before required
    })

    const formik = useFormik({
        initialValues: {
            customer: "",
            phone: "",
            address: "",
            delivery_details: "",
            event_id: ""
        },
        validationSchema: orderSchema,
        onSubmit: (values) => {
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
        }
    })
    
    return (
        <div>
            <h1>Add New Order</h1>
            <form onSubmit={formik.handleSubmit}>
                <input 
                    type="text"
                />
            </form>
        </div>
    )
}

export default NewOrderForm