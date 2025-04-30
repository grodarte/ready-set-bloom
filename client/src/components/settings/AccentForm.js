import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { formatAccent } from '../../formatters';
import { useContext } from 'react';
import { AccentContext } from '../../context/accent';

function AccentForm({ onSuccessMsg }) {
    const { setAccents } = useContext(AccentContext)

    const accentSchema = yup.object().shape({
        color: yup.string().required('Color is required')
    });

    function handleSubmit(values, { resetForm }) {
        fetch('/api/accents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(r => r.json())
        .then(newAccent => {
            const formatted = formatAccent(newAccent)
            setAccents(prev => [...prev, formatted])
            resetForm()
            onSuccessMsg("Accent created successfully!")
        })
        .catch(err => console.error("Error creating wristlet:", err));
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