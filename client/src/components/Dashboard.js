import { useContext } from "react"
import { EventContext } from "../context/event"

function Dashboard() {
// will need access to events and associated orders
    const { events } = useContext(EventContext)

    return (
        <div>
            <h2>Dashboard Component</h2>
            <h3>This Week</h3>
            
            <h3>Upcoming Events</h3>

            {events.map(event=> <li key={event.id}>{event.event_date} | {event.name}</li>)}
        </div>
    )
}

export default Dashboard
