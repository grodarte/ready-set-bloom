import { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { WristletContext } from "../../context/wristlet";
import { formatWristlet } from "../../formatters";

function WristletForm({ onSuccessMsg }) {
    const { wristlets, setWristlets } = useContext(WristletContext);

    const initialValues = {
        color: "",
        style: ""
    };

    const wristletSchema = yup.object().shape({
        color: yup.string().required("Color is required"),
        style: yup.string()
    });

    function handleSubmit(values, { resetForm }) {
        fetch("/api/wristlets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        })
        .then(r => {
            if (!r.ok) throw new Error("Failed to create wristlet");
            return r.json();
        })
        .then(newWristlet => {
            const formatted = formatWristlet(newWristlet)
            setWristlets(prev => [...prev, formatted]);
            resetForm();
            onSuccessMsg("Wristlet created successfully!")
        })
        .catch(err => console.error("Error creating wristlet:", err));
    }

    return (
        <div className="settings-form">
            <h3>Add Wristlet</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={wristletSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div>
                        <label htmlFor="color">Color</label>
                        <Field name="color" />
                        <ErrorMessage name="color" component="div" className="error" />
                    </div>
                    <div>
                        <label htmlFor="style">Style</label>
                        <Field name="style" />
                        <ErrorMessage name="style" component="div" className="error" />
                    </div>
                    <button type="submit">Add Wristlet</button>
                </Form>
            </Formik>
        </div>
    );
}

export default WristletForm;