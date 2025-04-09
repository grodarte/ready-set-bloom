import React, { useEffect, useState } from "react";

const EventContext = React.createContext()

function EventProvider({ children }) {
    const [events, setEvents] = useState([])

    useEffect(()=>{
        fetch('/api/events')
        .then(r=>r.json())
        .then(eventData=>{
            setEvents(eventData)
        })
    }, [])

    return (
        <EventContext.Provider value={{events, setEvents}}>
            {children}
        </EventContext.Provider>
    )
}

export { EventContext, EventProvider }