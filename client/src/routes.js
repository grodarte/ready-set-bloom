import App from './components/App'
import Dashboard from './components/Dashboard'
import Orders from './components/Orders'
import Items from './components/Items'
import NewOrderForm from './components/NewOrderForm'

const routes = [
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Dashboard/>
            },
            {
                path: "/orders",
                element: <Orders/>
            },
            {
                path: "/items",
                element: <Items/>
            },
            {
                path: "/neworderform",
                element: <NewOrderForm/>
            }
        ]
    }
]

export default routes