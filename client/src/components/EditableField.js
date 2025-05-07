import "./../styles/editablefield.css"

function EditableField({ value, isEditing, onChange, name }) {

    return (
        <div className="editable-field">
            {isEditing ? (
                <input
                type="text"
                name={name}
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                />
            ) : (
                <p>{value}</p>
            )}
        </div>
    )
}

export default EditableField
  