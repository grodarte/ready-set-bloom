function OrderOverviewTable ({ orderCount, corsageCount, boutCount, bouquetCount }) {
    return (
        <div className="table-container">
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
                        <td>{orderCount}</td>
                    </tr>
                    <tr>
                        <td>Corsages</td>
                        <td>{corsageCount}</td>
                    </tr>
                    <tr>
                        <td>Boutonnieres</td>
                        <td>{boutCount}</td>
                    </tr>
                    <tr>
                        <td>Bouquets</td>
                        <td>{bouquetCount}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default OrderOverviewTable