import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <NavLink
                to="/"
            >
                Dashboard
            </NavLink>
            <NavLink
                to="/orders"
            >
                Orders
            </NavLink>
            <NavLink
                to="/items"
            >
                Items
            </NavLink>
            <NavLink
                to="/neworderform"
            >
                + New Order
            </NavLink>
        </nav>
    )
}

export default NavBar