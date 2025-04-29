

function SuppliesTable({ orderCount, corsageCount, boutCount, bouquetCount }) {
    return (
        <div className="table-container">
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
                        <td>{orderCount}</td>
                    </tr>
                    <tr>
                        <td>Boxes</td>
                        <td>{corsageCount + boutCount}</td>
                    </tr>
                    <tr>
                        <td>Magnets</td>
                        <td>{boutCount}</td>
                    </tr>
                    <tr>
                        <td>Pins</td>
                        <td>{boutCount + (bouquetCount * 6)}</td>
                    </tr>
                    <tr>
                        <td>Jewels</td>
                        <td>{corsageCount + bouquetCount}</td>
                    </tr>
                    <tr>
                        <td>Jars</td>
                        <td>{bouquetCount}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default SuppliesTable