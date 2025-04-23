import { useContext } from "react";
import { WristletContext } from "../../context/wristlet"

function WristletTable({ corsages }) {
    const { wristlets } = useContext(WristletContext)

    console.log(corsages)

    const wristletRows = wristlets.map(wristlet => (
        <tr>
            <td>{wristlet.color} {wristlet.style}</td>
            <td>{corsages.filter(c => c.wristlet.id === wristlet.id).length}</td>
        </tr>
    ))
    return (
        <div className="table-container">
            <table>
                <caption>Wristlets</caption>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Qty</th>
                    </tr>
                </thead>
                <tbody>
                    {wristletRows}
                </tbody>
            </table>
        </div>
    )
}

export default WristletTable