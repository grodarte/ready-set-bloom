import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useContext, useState } from "react";
import { FlowerContext } from "../../context/flower";
import { formatFlower } from "../../formatters";

function FlowerForm() {
    const { flowers, setFlowers } = useContext(FlowerContext);
    const [successMsg, setSuccessMsg] = useState("")
    

    const flowerSchema = yup.object().shape({
        name: yup.string().required("Flower name is required"),
        color: yup.string().required("Flower color is required"),
    });

    function handleSubmit(values, { resetForm }) {
        fetch("/api/flowers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((r) => {
                if (!r.ok) throw new Error("Failed to add flower");
                return r.json();
            })
            .then((newFlower) => {
                const formatted = formatFlower(newFlower)
                setFlowers([...flowers, formatted]);
                resetForm();
                setSuccessMsg("Flower created successfully!")
                window.scrollTo({ top: 0, behavior:'smooth' })
                setTimeout(()=> setSuccessMsg(""), 5000)
            })
            .catch((err) => console.error("Error adding flower:", err));
    }

    return (
        <div className="form-section">
            <h3>Add Flower</h3>
            <Formik
                initialValues={{ name: "", color: "" }}
                validationSchema={flowerSchema}
                onSubmit={handleSubmit}
            >
                <>
                    {successMsg && (
                        <div className="success-message">
                            {successMsg}
                        </div>
                    )}
                    <Form>
                        <div>
                            <label htmlFor="name">Name</label>
                            <Field name="name" />
                            <ErrorMessage name="name" component="div" className="error" />
                        </div>
                        <div>
                            <label htmlFor="color">Color</label>
                            <Field name="color" />
                            <ErrorMessage name="color" component="div" className="error" />
                        </div>
                        <button type="submit">Add Flower</button>
                    </Form>
                </>
            </Formik>
        </div>
    );
}

export default FlowerForm;