import React, { useEffect, useState } from "react";
import { formatEvent } from "../formatters";


const EventContext = React.createContext()

function EventProvider({ children }) {
    const [events, setEvents] = useState([])

    useEffect(()=>{
        fetch('/api/events')
        .then(r=>r.json())
        .then(eventData=>{
            const formatted = eventData.map(formatEvent)
            setEvents(formatted)
        })
    }, [events])

    return (
        <EventContext.Provider value={{events, setEvents}}>
            {children}
        </EventContext.Provider>
    )
}

export { EventContext, EventProvider }