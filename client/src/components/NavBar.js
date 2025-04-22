import { NavLink } from "react-router-dom";
import "../css/navbar.css";

function NavBar() {
    return (
        <nav className="navbar">
            <h1 className="navbar-title">Ready Set Bloom</h1>
            <div className="navbar-links">
                <NavLink to="/" className="nav-link">Dashboard</NavLink>
                <NavLink to="/orders" className="nav-link">Orders</NavLink>
                <NavLink to="/items" className="nav-link">Items</NavLink>
                <NavLink to="/neworderform" className="nav-link new-order">+ New Order</NavLink>
            </div>
        </nav>
    )
}

export default NavBar