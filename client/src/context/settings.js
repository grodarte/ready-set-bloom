import React, { useState } from "react";

const SettingsContext = React.createContext()

function SettingsProvider({ children }) {
    const [showSettings, setShowSettings] = useState(false)

    return (
        <SettingsContext.Provider value={{showSettings, setShowSettings}}>
            {children}
        </SettingsContext.Provider>
    )
}

export { SettingsContext, SettingsProvider }