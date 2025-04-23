import { useContext, useMemo } from "react";
import OrderOverviewTable from "./OrderOverviewTable";
import WristletTable from "./WristletTable";
import AccentTable from "./AccentTable";
import FlowerTable from "./FlowerTable";
import SuppliesTable from "./SuppliesTable";
import RibbonTable from "./RibbonTable";
import { OrderContext } from "../context/order";
import { ItemContext } from "../context/item"

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
        <div>
            <OrderOverviewTable orderCount={prepStats.orderCount} corsageCount={prepStats.corsageCount} boutCount={prepStats.boutCount} bouquetCount={prepStats.bouquetCount}/>
            <WristletTable corsages={prepStats.corsages}/>
            <AccentTable/>
            <FlowerTable/>
            <SuppliesTable/>
            <RibbonTable/>
        </div>
    )
}

export default PrepSummary