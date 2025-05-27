import { useContext, useMemo } from "react";
import OrderOverviewTable from "./OrderOverviewTable";
import WristletTable from "./WristletTable";
import AccentTable from "./AccentTable";
import FlowerTable from "./FlowerTable";
import SuppliesTable from "./SuppliesTable";
import RibbonTable from "./RibbonTable";
import { OrderContext } from "../../context/order";
import { ItemContext } from "../../context/item"
import "../../styles/prepsummary.css"

function PrepSummary({ events }) {
    const { orders } = useContext(OrderContext)
    
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

    if (!prepStats) return <p></p>
    
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