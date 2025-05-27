import { NavLink } from "react-router-dom";
import "../styles/navbar.css";
import { useContext } from "react";
import { SettingsContext } from "../context/settings"

function NavBar() {
    const { setShowSettings } = useContext(SettingsContext)

    return (
        <nav className="navbar">
            <div className="nav-left">
                <div className="nav-logo">❀ Ready Set Bloom</div>
                <div className="nav-links">
                    <NavLink to="/" className="nav-link">Dashboard</NavLink>
                    <NavLink to="/orders" className="nav-link">Orders</NavLink>
                    <NavLink to="/items" className="nav-link">Items</NavLink>
                </div>

            </div>
            <div className="nav-actions">
                <NavLink to="/neworderform">
                    <button className="new-order-btn">+ New Order</button>
                </NavLink>
                <button className="settings-button" onClick={() => setShowSettings(true)}>⚙</button>

            </div>
        </nav>
    )
}

export default NavBar