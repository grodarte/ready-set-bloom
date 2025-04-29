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

    console.log(orders.map(order => order.items?.map(item => item.ribbon_color)))
    
    const eventIDs = events.map(event=>event.id)
    
    const prepStats = useMemo(()=> {
        if (!events?.length || !orders?.length === 0) return null
        
        const eventOrders = orders.filter(order => eventIDs.includes(order.event_id))
        const items = eventOrders.flatMap(order => order.items)
        const corsages = items.filter(item => item.item_type.toLowerCase() === "corsage")
        const bouts = items.filter(item => item.item_type.toLowerCase() === "boutonniere")
        const bouquets = items.filter(item => item.item_type.toLowerCase() === "bouquet")
                
        return {
            eventOrders: eventOrders,
            orderCount: eventOrders.length,
            items: items,
            corsages: corsages,
            corsageCount: corsages.length,
            bouts: bouts,
            boutCount: bouts.length,
            bouquets: bouquets,
            bouquetCount: bouquets.length
        }
    }, [orders, events])

    if (!prepStats) return <p>Loading prep summary...</p>
    
    return (
        <div>
            <div className="prep-summary-grid">
                <OrderOverviewTable orderCount={prepStats.orderCount} corsageCount={prepStats.corsageCount} boutCount={prepStats.boutCount} bouquetCount={prepStats.bouquetCount}/>
                <WristletTable corsages={prepStats.corsages}/>
                <AccentTable corsages={prepStats.corsages} bouts={prepStats.bouts}/>
                <FlowerTable corsages={prepStats.corsages} bouts={prepStats.bouts} bouquets={prepStats.bouquets}/>
                <RibbonTable items={prepStats.items} corsages={prepStats.corsages} bouts={prepStats.bouts} bouquets={prepStats.bouquets}/>
                <SuppliesTable orderCount={prepStats.orderCount} corsageCount={prepStats.corsageCount} boutCount={prepStats.boutCount} bouquetCount={prepStats.bouquetCount}/>
            </div>
        </div>
    )
}

export default PrepSummary