import EventForm from "./EventForm"
import FlowerForm from "./FlowerForm"
import WristletForm from "./WristletForm"
import AccentForm from "./AccentForm"
import "../../css/settings.css"
import { useContext, useState } from "react"
import { SettingsContext } from "../../context/settings"

function Settings() {
    const { setShowSettings } = useContext(SettingsContext)
    const [showSections, setShowSections] = useState(true)
    const [showEventForm, setShowEventForm] = useState(false)
    const [showFlowerForm, setShowFlowerForm] = useState(false)
    const [showWristletForm, setShowWristletForm] = useState(false)
    const [showAccentForm, setShowAccentForm] = useState(false)

    return (
        <div className="settings-panel">
            <h2>⚙ Settings</h2>
            <button className="close-button" onClick={() => setShowSettings(false)}>X</button>
            {showSections ? 
                <>
                    <button 
                        onClick={() => {
                            setShowSections(false) 
                            setShowEventForm(true)
                        }}
                    >
                        ➕ Add New Event
                    </button>
                    <button 
                        onClick={() => {
                            setShowSections(false) 
                            setShowFlowerForm(true)
                        }}
                    >
                        ➕ Add New Flower
                    </button>
                    <button 
                        onClick={() => {
                            setShowSections(false) 
                            setShowWristletForm(true)
                        }}
                    >
                        ➕ Add New Wristlet
                    </button>
                    <button 
                        onClick={() => {
                            setShowSections(false) 
                            setShowAccentForm(true)
                        }}
                    >
                        ➕ Add New Accent
                    </button>
                </>
                :
                <>
                    <button 
                        className="back-button"
                        onClick={() => {
                            setShowSections(true)
                            setShowEventForm(false)
                            setShowFlowerForm(false)
                            setShowWristletForm(false)
                            setShowAccentForm(false)
                        }}
                    >
                        ⬅ Back
                    </button>
                    {showEventForm ? <EventForm/> : null}
                    {showFlowerForm ? <FlowerForm/> : null}
                    {showWristletForm ? <WristletForm/> : null}
                    {showAccentForm ? <AccentForm/> : null}
                </>
            }

        </div>
    )
}

export default Settings