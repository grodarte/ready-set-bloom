import { useContext, useMemo } from "react";
import OrderOverviewTable from "./tables/OrderOverviewTable";
import WristletTable from "./tables/WristletTable";
import AccentTable from "./tables/AccentTable";
import FlowerTable from "./tables/FlowerTable";
import SuppliesTable from "./tables/SuppliesTable";
import RibbonTable from "./tables/RibbonTable";
import { OrderContext } from "../context/order";
import { ItemContext } from "../context/item"
import "../css/prepsummary.css"

function PrepSummary({ events }) {
    const { orders } = useContext(OrderContext)

    const eventIDs = events.map(event=>event.id)

    const prepStats = useMemo(()=> {
        
        const eventOrders = orders.filter(order => eventIDs.includes(order.event_id))
        const items = eventOrders.flatMap(order => order.items)
        const corsages = items.filter(item => item.item_type === "corsage")
        const bouts = items.filter(item => item.item_type === "boutonniere")
        const bouquets = items.filter(item => item.item_type === "bouquet")

        return {
            orderCount: eventOrders.length,
            corsageCount: corsages.length,
            boutCount: bouts.length,
            bouquetCount: bouquets.length,
            corsages: corsages,
            bouts: bouts,
            bouquets: bouquets,
        }
    }, [orders])

    console.log(prepStats)


    return (
        <div className="prep-summary-grid">
            <OrderOverviewTable orderCount={prepStats.orderCount} corsageCount={prepStats.corsageCount} boutCount={prepStats.boutCount} bouquetCount={prepStats.bouquetCount}/>
            <WristletTable corsages={prepStats.corsages}/>
            <AccentTable/>
            <FlowerTable/>
            <RibbonTable/>
            <SuppliesTable orderCount={prepStats.orderCount}/>
        </div>
    )
}

export default PrepSummary