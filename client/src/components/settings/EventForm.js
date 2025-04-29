import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useContext } from 'react';
import { EventContext } from '../../context/event';

function EventForm() {
    const { events, setEvents } = useContext(EventContext);

    const initialValues = {
        name: '',
        event_date: ''
    };

    const validationSchema = yup.object().shape({
        name: yup.string().required('Event name is required'),
        event_date: yup.date().required('Event date is required')
    });

    function handleSubmit(values, { resetForm }) {
        fetch('/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(newEvent => {
                setEvents(prev => [...prev, newEvent]);
                resetForm();
            })
            .catch(err => console.error('Error creating event:', err));
    }

    return (
        <div className="form-section">
            <h3>Add Event</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div>
                        <label htmlFor="name">Name</label>
                        <Field name="name" />
                        <ErrorMessage name="name" component="div" className="error" />
                    </div>
                    <div>
                        <label htmlFor="event_date">Date</label>
                        <Field name="event_date" type="date" />
                        <ErrorMessage name="event_date" component="div" className="error" />
                    </div>
                    <button type="submit">Add Event</button>
                </Form>
            </Formik>
        </div>
    );
}

export default EventForm;