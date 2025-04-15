import { EventProvider } from "../context/event";
import { OrderProvider } from "./order";
import { ItemProvider } from "./item";
import { WristletProvider } from "../context/wristlet";
import { FlowerProvider } from "../context/flower";
import { AccentProvider } from "../context/accent";

function ContextProviderWrapper({ children }) {
    return (
        <EventProvider>
            <OrderProvider>
                <ItemProvider>
                    <WristletProvider>
                        <FlowerProvider>
                            <AccentProvider>
                                {children}
                            </AccentProvider>
                        </FlowerProvider>
                    </WristletProvider>
                </ItemProvider>
            </OrderProvider>
        </EventProvider>
    )
}

export default ContextProviderWrapper