import { useEffect, useState } from "react";

function useInlineEdit(initialValues) {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(initialValues);

    useEffect(() => {
        setEditData(initialValues)
    }, [JSON.stringify(initialValues)])

    function startEditing() {
        setIsEditing(true);
    }

    function cancelEditing() {
        setEditData(initialValues)
        setIsEditing(false)
    }

    function handleChange(field, value) {
        setEditData(prev => ({ ...prev, [field]: value }))
    }

    return {
        isEditing,
        setIsEditing,
        editData,
        setEditData,
        startEditing,
        cancelEditing,
        handleChange,
    }
}

export default useInlineEdit
