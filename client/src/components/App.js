import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { SettingsContext } from "../context/settings";
import { OrderPanelContext } from "../context/orderpanel";
import NavBar from "./NavBar";
import Settings from "./settings/Settings";
import OrderPanel from "./OrderPanel";

function App() {
  const { showSettings } = useContext(SettingsContext)
  const { selectedOrderId } = useContext(OrderPanelContext)

  return (
    <div>
      <header>
        <NavBar/>
      </header>

      {showSettings ? <Settings/> : null}
      {selectedOrderId ? <OrderPanel/> : null}

      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default App;
