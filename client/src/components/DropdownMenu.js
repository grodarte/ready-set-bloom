import { useRef, useState } from "react";


function DropdownMenu({ onDelete, onEdit }) {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef(null)

    return (
        <div ref={menuRef}>
            <button
                onClick={()=>setIsOpen(prev => !prev)}
            >
                ⋮
            </button>

            {isOpen && (
                <div>
                    <button>
                        Mark as...
                    </button>
                    <button
                        onClick={() => {
                            setIsOpen(false)
                            onEdit()
                        }}
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => {
                            setIsOpen(false)
                            onDelete()
                        }}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    )
}

export default DropdownMenu