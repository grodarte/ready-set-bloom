import { EventContext } from "../../context/event";
import { FlowerContext } from "../../context/flower";
import { WristletContext } from "../../context/wristlet";
import { AccentContext } from "../../context/accent";
import { useContext } from "react";

function Settings() {
    const { events, setEvents } = useContext(EventContext)
    const { flowers, setFlowers } = useContext(FlowerContext)
    const { wristlets, setWristlets } = useContext(WristletContext)
    const { accents, setAccents } = useContext(AccentContext)

    return (
        <div>
            
        </div>
    )
}

export default Settings