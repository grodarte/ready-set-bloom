import React, { useContext, useEffect, useState } from "react";
import { EventContext } from "./event"

const DateContext = React.createContext()

function DateProvider({ children }) {
    const [today, setToday] = useState(new Date())
    const [endOfWeek, setEndOfWeek] = useState('')
    const { events } = useContext(EventContext)

    useEffect(()=>{
        const now = new Date()
        setToday(now)

        const weekEnd = new Date(now)
        weekEnd.setDate(now.getDate() + (7 - now.getDay()))
        setEndOfWeek(weekEnd)
        }, [events])

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

    return (
        <DateContext.Provider value={{ thisWeekEvents, upcomingEvents, completedEvents }}>
            {children}
        </DateContext.Provider>
    )
}

export { DateContext, DateProvider }