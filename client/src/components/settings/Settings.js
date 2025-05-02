import EventForm from "./EventForm"
import FlowerForm from "./FlowerForm"
import WristletForm from "./WristletForm"
import AccentForm from "./AccentForm"
import "../../styles/settings.css"
import { useContext, useState } from "react"
import { SettingsContext } from "../../context/settings"

function Settings() {
    const { setShowSettings } = useContext(SettingsContext)
    const [showSections, setShowSections] = useState(true)
    const [showEventForm, setShowEventForm] = useState(false)
    const [showFlowerForm, setShowFlowerForm] = useState(false)
    const [showWristletForm, setShowWristletForm] = useState(false)
    const [showAccentForm, setShowAccentForm] = useState(false)
    const [successMsg, setSuccessMsg] = useState("")

    function handleSuccessMsg(msg){
        setSuccessMsg(msg)
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setShowSections(true)
        setShowEventForm(false)
        setShowFlowerForm(false)
        setShowWristletForm(false)
        setShowAccentForm(false)
        setTimeout(()=> setSuccessMsg(""), 5000)
    }

    return (
        <div className="settings-panel">
            <div className="settings-header">
                <h2>⚙ Settings</h2>
                <button className="close-button" onClick={() => setShowSettings(false)}>X</button>
                {successMsg && (
                    <div className="success-message">
                        {successMsg}
                    </div>
                )}
            </div>
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
                    {showEventForm ? <EventForm onSuccessMsg={handleSuccessMsg}/> : null}
                    {showFlowerForm ? <FlowerForm onSuccessMsg={handleSuccessMsg}/> : null}
                    {showWristletForm ? <WristletForm onSuccessMsg={handleSuccessMsg}/> : null}
                    {showAccentForm ? <AccentForm onSuccessMsg={handleSuccessMsg}/> : null}
                </>
            }

        </div>
    )
}

export default Settings