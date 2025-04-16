import React, { useEffect, useState } from "react";

const DateContext = React.createContext()

function DateProvider({ children }) {
    const [today, setToday] = useState(new Date())
    const [endOfWeek, setEndOfWeek] = useState('')

    useEffect(()=>{
        const weekEnd = new Date(today)
        const dayOfWeek = weekEnd.getDay()
        const daysUntilSunday = 7 - dayOfWeek
        weekEnd.setDate(today.getDate() + daysUntilSunday)
        setEndOfWeek(weekEnd)
        }, [today])

    return (
        <DateContext.Provider value={{ today, endOfWeek }}>
            {children}
        </DateContext.Provider>
    )
}

export { DateContext, DateProvider }