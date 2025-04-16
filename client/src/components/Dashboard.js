import { useContext } from "react"
import { EventContext } from "../context/event"
import { DateContext } from "../context/DateContext"
import PrepSummary from "./PrepSummary"

function Dashboard() {
// will need access to events and associated orders
    const { events } = useContext(EventContext)
    const { today, endOfWeek } = useContext(DateContext)

    // need to get events for this week and events upcoming
    const thisWeekEvents = events.filter(event=>{
        const eventDate = new Date(event.event_date)
        return eventDate <= endOfWeek && eventDate >= today
    })

    const upcomingEvents = events.filter(event=>{
        const eventDate = new Date(event.event_date)
        return eventDate > endOfWeek
    })

    const completedEvents = events.filter(event=>{
        const eventDate = new Date(event.event_date)
        return eventDate < today
    })

    console.log(events)

    console.log(thisWeekEvents, upcomingEvents)
    return (
        <div>
            <h1>Dashboard</h1>
            <h2>This Week</h2>
            {
                thisWeekEvents.length === 0 ? <h3>No events this week.</h3> : thisWeekEvents.map(event=> <h3>{event.event_date} | {event.name}</h3>)
            }
            <h2>Upcoming Events</h2>
            {
                upcomingEvents.length === 0 ? <h3>No upcoming events.</h3> : upcomingEvents.map(event=> <li key={event.id}>{event.event_date} | {event.name}</li>)
            }
            <h2>Completed Events</h2>
            {
                completedEvents.length === 0 ? <h3>No completed events.</h3> : completedEvents.map(event=> <li key={event.id}>{event.event_date} | {event.name}</li>)
            }

        </div>
    )
}

export default Dashboard
