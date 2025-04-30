import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Settings from "./settings/Settings";
import { useContext } from "react";
import { SettingsContext } from "../context/settings";
import { OrderPanelContext } from "../context/orderpanel";
import OrderPanel from "./OrderPanel";

function App() {
  const { showSettings } = useContext(SettingsContext)
  const { showOrderPanel } = useContext(OrderPanelContext)

  return (
    <div>
      <header>
        <NavBar/>
      </header>

      {showSettings ? <Settings/> : null}
      {showOrderPanel ? <OrderPanel/> : null}

      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default App;
