import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

function AccentForm() {
    const accentSchema = yup.object().shape({
        color: yup.string().required('Color is required')
    });

    function handleSubmit(values, { resetForm }) {
        console.log("Submitting accent:", values);
        // Insert fetch POST request here
        resetForm();
    }

    return (
        <div className="settings-section">
            <h3>Add New Accent</h3>
            <Formik
                initialValues={{ color: '' }}
                validationSchema={accentSchema}
                onSubmit={handleSubmit}
            >
                <Form className="settings-form">
                    <div>
                        <label htmlFor="color">Accent Color</label>
                        <Field name="color" type="text" />
                        <ErrorMessage name="color" component="div" className="error" />
                    </div>
                    <button type="submit">Add Accent</button>
                </Form>
            </Formik>
        </div>
    );
}

export default AccentForm;