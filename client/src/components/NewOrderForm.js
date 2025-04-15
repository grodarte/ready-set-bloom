import { useFormik } from 'formik';
import * as yup from 'yup';

function NewOrderForm() {

    const formik = useFormik({
        initialValues: {

        },
        onSubmit: values => {
            alert()
        }
    })
    
    return (
        <div>
            <h1>Add New Order</h1>
            <form action=""></form>
        </div>
    )
}

export default NewOrderForm