import { AccentContext } from "../../context/accent";
import { useContext } from "react";

function AccentTable({ corsages, bouts }) {
    const { accents } = useContext(AccentContext)

    const accentRows = accents.map(accent => (
        <tr key={accent.id}>
            <td>{accent.color}</td>
            <td>{corsages.filter(c => c.accent?.id === accent.id).length}</td>
            <td>{bouts.filter(b => b.accent?.id === accent.id).length}</td>
        </tr>
    ))
    return (
        <div className="table-container">
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
                    {accentRows}
                </tbody>
            </table>
        </div>
    )
}

export default AccentTable