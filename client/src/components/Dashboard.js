import { useContext } from "react"
import { DateContext } from "../context/DateContext"
import { formatDate } from "../formatters"
import PrepSummary from "./prepsummary/PrepSummary"
import { EventContext } from "../context/event"

function Dashboard() {
    const { events } = useContext(EventContext)
    const { startOfWeek, endOfWeek, startOfNextWeek, endOfNextWeek } = useContext(DateContext)

    const thisWeekEvents = events.filter(event=>{
        const eventDate = new Date(event.event_date)
        return eventDate <= endOfWeek && eventDate >= startOfWeek
    })

    const upcomingEvents = events.filter(event=>{
        const eventDate = new Date(event.event_date)
        return eventDate > endOfNextWeek
    })

    const nextWeekEvents = events.filter(event=>{
        const eventDate = new Date(event.event_date)
        return eventDate >= startOfNextWeek && eventDate <= endOfNextWeek
    })

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>This Week</h2>
            {
                thisWeekEvents.length === 0 ? <h3>No events this week.</h3> : thisWeekEvents.map(event => (
                    <>
                        <h3>{formatDate(event?.event_date)} | {event.name}</h3>
                    </>
                ))
            }
            <PrepSummary events={thisWeekEvents}/>
            <h2>Next Week</h2>
            {
                nextWeekEvents.length === 0 ? <h3>No completed events.</h3> : nextWeekEvents.map(event => <li key={event.id}>{formatDate(event?.event_date)} | {event.name}</li>)
            }
            <h2>Upcoming Events</h2>
            {
                upcomingEvents.length === 0 ? <h3>No upcoming events.</h3> : upcomingEvents.map(event => <li key={event.id}>{formatDate(event?.event_date)} | {event.name}</li>)
            }

        </div>
    )
}

export default Dashboard
