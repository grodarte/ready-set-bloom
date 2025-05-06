import React, { useContext, useEffect, useState } from "react";
import { EventContext } from "./event"

const DateContext = React.createContext()

function DateProvider({ children }) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const startOfWeek = new Date(today)
    const day = today.getDay()
    const daysSinceMonday = (day === 0) ? 6 : day - 1
    startOfWeek.setDate(today.getDate() - daysSinceMonday)
    startOfWeek.setHours(0, 0, 0, 0)

    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    endOfWeek.setHours(23, 59, 59, 999)

    const startOfNextWeek = new Date(startOfWeek)
    startOfNextWeek.setDate(startOfWeek.getDate() + 7)
    startOfNextWeek.setHours(0, 0, 0, 0)

    const endOfNextWeek = new Date(startOfNextWeek)
    endOfNextWeek.setDate(startOfNextWeek.getDate() + 6)
    endOfNextWeek.setHours(23, 59, 59, 999)

    return (
        <DateContext.Provider value={{ today, startOfWeek, endOfWeek, startOfNextWeek, endOfNextWeek }}>
            {children}
        </DateContext.Provider>
    )
}

export { DateContext, DateProvider }