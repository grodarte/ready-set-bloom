import { useEffect, useRef, useState } from "react";
import "../styles/dropdownmenu.css"


function DropdownMenu({ onDelete, onEdit }) {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="dropdown-container" ref={menuRef}>
            <button
                onClick={()=>setIsOpen(prev => !prev)}
                className="dropdown-toggle"
            >
                ⋮
            </button>

            {isOpen && (
                <div className="dropdown-menu">
                    <button
                        className="dropdown-item"
                    >
                        Mark as...
                    </button>
                    <button
                        onClick={() => {
                            setIsOpen(false)
                            onEdit()
                        }}
                        className="dropdown-item"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => {
                            setIsOpen(false)
                            onDelete()
                        }}
                        className="dropdown-item delete"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    )
}

export default DropdownMenu