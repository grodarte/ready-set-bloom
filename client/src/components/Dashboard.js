import { useContext } from "react"
import { EventContext } from "../context/event"
import { WristletContext } from "../context/wristlet"
import { FlowerContext } from "../context/flower"
import { RibbonContext } from "../context/ribbon"
import { AccentContext } from "../context/accent"


function Dashboard() {
// will need access to events and associated orders
    const { events } = useContext(EventContext)

    return (
        <div>
            <h2>Dashboard Component</h2>
            <h3>This Week At A Glance</h3>
            <ul>
                <li>No events</li>
            </ul>
            <h3>Upcoming Events {"(next week)"}</h3>
            <ul>
                <li>No events</li>
            </ul>
            <h3>All Events</h3>
            {events.map(event=> <li key={event.id}>{event.event_date} | {event.name}</li>)}
        </div>
    )
}

export default Dashboard
