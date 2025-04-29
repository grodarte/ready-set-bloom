import { NavLink } from "react-router-dom";
import "../css/navbar.css";
import { useContext } from "react";
import { SettingsContext } from "../context/settings"

function NavBar() {
    const { showSettings, setShowSettings } = useContext(SettingsContext)

    return (
        <nav className="navbar">
            <h1 className="navbar-title">Ready Set Bloom</h1>
            <div className="navbar-links">
                <NavLink to="/" className="nav-link">Dashboard</NavLink>
                <NavLink to="/orders" className="nav-link">Orders</NavLink>
                <NavLink to="/items" className="nav-link">Items</NavLink>
                <NavLink to="/neworderform" className="nav-link new-order">+ New Order</NavLink>
                {showSettings ? null : <button onClick={() => setShowSettings(true)}>Settings</button>}
            </div>
        </nav>
    )
}

export default NavBar