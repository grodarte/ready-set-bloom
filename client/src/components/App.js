import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Settings from "./settings/Settings";
import { useContext } from "react";
import { SettingsContext } from "../context/settings";

function App() {
  const { showSettings } = useContext(SettingsContext)

  return (
    <div>
      <header>
        <NavBar/>
      </header>

      {<Settings/>}

      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default App;
