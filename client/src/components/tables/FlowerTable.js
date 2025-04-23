import { useContext } from "react";
import { FlowerContext } from "../../context/flower"


function FlowerTable({ corsages, bouts, bouquets }) {
    const { flowers } = useContext(FlowerContext)

    const flowerRows = flowers.map(flower => (
        <tr>
            <td>{flower.color}</td>
            <td>{corsages.filter(c => c.flower.id === flower.id).length}</td>
            <td>{bouts.filter(b => b.flower.id === flower.id).length}</td>
            <td>{bouquets.filter(b => b.flower.id === flower.id).length}</td>
        </tr>
    ))

    return (
        <div className="table-container">
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
                    {flowerRows}
                </tbody>
            </table>
        </div>
    )
}

export default FlowerTable