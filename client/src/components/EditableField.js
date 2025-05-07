import "./../styles/editablefield.css"

function EditableField({ value, isEditing, onChange, name, options, useId = false }) {

    return (
        <div className="editable-field">
            {isEditing ? (
                options ? (
                    <select 
                        name={name}
                        value={value || ""}
                        onChange={(e) => {
                            const selectedValue = useId ? parseInt(e.target.value) : e.target.value
                            onChange(name, selectedValue)
                        }}
                    >
                        <option value="">None selected</option>
                        {options.map(opt => (
                            <option key={opt.id || opt} value={useId ? opt.id : opt}>
                                {opt.name}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        type="text"
                        name={name}
                        value={value}
                        onChange={(e) => onChange(name, e.target.value)}
                    />
                )
            ) : (
                <p>
                    {options && useId
                        ? options.find(opt => opt.id === value)?.name || <span>-</span>
                        : value || <span>-</span>
                    }
                </p>
            )}
        </div>
    )
}

export default EditableField
  