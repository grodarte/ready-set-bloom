import { useContext } from "react"

function RibbonTable({ items, corsages, bouts, bouquets }) {
    const ribbons = [...new Set(items.map(item => item.ribbon_color))]

    const ribbonRows = ribbons.map(ribbon => (
        <tr>
            <td>{ribbon}</td>
            <td>{corsages.filter(c => c.ribbon_color.toLowerCase() === ribbon.toLowerCase()).length}</td>
            <td>{bouts.filter(b => b.ribbon_color.toLowerCase() === ribbon.toLowerCase()).length}</td>
            <td>{bouquets.filter(b => b.ribbon_color.toLowerCase() === ribbon.toLowerCase()).length}</td>

        </tr>
    ))

    return (
        <div className="table-container">
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
                    {ribbonRows}
                </tbody>
            </table>
        </div>
    )
}

export default RibbonTable