import { useMemo } from "react"


function PrepSummary({ events }) {
    const eventItems = events.map(event=>event.items)

    const prepStats = useMemo(()=> {
        // stat logic here

        return {
            totalOrders: {},

        }
    })


    return (
        <div>
            <OrderOverviewTable/>
            <WristletTable/>
            <AccentTable/>
            <FlowerTable/>
            <SuppliesTable/>
            <RibbonTable/>
        </div>
    )
}

export default PrepSummary

function OrderOverviewTable () {
    return (
        <table>
            <caption>Order Overview</caption>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Qty</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Total Orders</td>
                    <td>{}</td>
                </tr>
                <tr>
                    <td>Corsages</td>
                    <td>{}</td>
                </tr>
                <tr>
                    <td>Boutonnieres</td>
                    <td>{}</td>
                </tr>
                <tr>
                    <td>Bouquets</td>
                    <td>{}</td>
                </tr>
            </tbody>
        </table>
    )
}

function WristletTable() {
    return (
        <table>
            <caption>Wristlets</caption>
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Qty</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    {/* WRISTLET TYPES MAPPED THROUGH */}
                </tr>
            </tbody>
        </table>
    )
}

function AccentTable() {
    return (
        <table>
            <caption>Accents</caption>
            <thead>
                <tr>
                    <th>Color</th>
                    <th>Corsage</th>
                    <th>Bout</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    {/* ACCENT COLORS AND COUNTS */}
                </tr>
            </tbody>
        </table>
    )
}

function FlowerTable() {
    return (
        <table>
            <caption>Flowers</caption>
            <thead>
                <tr>
                    <th>Color</th>
                    <th>Corsage</th>
                    <th>Bout</th>
                    <th>Bouquet</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    {/* FLOWER COLORS + ISRAELI + ACCENT */}
                </tr>
            </tbody>
        </table>
    )
}

function SuppliesTable() {
    return (
        <table>
            <caption>Additional Supplies</caption>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Qty</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Bags</td>
                </tr>
                <tr>
                    <td>Boxes</td>
                </tr>
                <tr>
                    <td>Magnets</td>
                </tr>
                <tr>
                    <td>Pins</td>
                </tr>
                <tr>
                    <td>Jewels</td>
                </tr>
                <tr>
                    <td>Jars</td>
                </tr>
            </tbody>
        </table>
    )
}

function RibbonTable() {
    return (
        <table>
            <caption>Ribbons</caption>
            <thead>
                <tr>
                    <th>Color</th>
                    <th>Corsage</th>
                    <th>Bout</th>
                    <th>Bouquet</th>
                </tr>
            </thead>
            <tbody>
                {/* MAP THROUGH EACH COLOR AND COUNT QTY NEEDED */}
            </tbody>
        </table>
    )
}