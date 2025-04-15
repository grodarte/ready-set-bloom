import { EventProvider } from "../context/event";
import { OrderProvider } from "./order";
import { ItemProvider } from "./item";
import { WristletProvider } from "../context/wristlet";
import { FlowerProvider } from "../context/flower";
import { RibbonProvider } from "../context/ribbon";
import { AccentProvider } from "../context/accent";

function ContextProviderWrapper({ children }) {
    return (
        <EventProvider>
            <OrderProvider>
                <ItemProvider>
                    <WristletProvider>
                        <FlowerProvider>
                            <RibbonProvider>
                                <AccentProvider>
                                    {children}
                                </AccentProvider>
                            </RibbonProvider>
                        </FlowerProvider>
                    </WristletProvider>
                </ItemProvider>
            </OrderProvider>
        </EventProvider>
    )
}

export default ContextProviderWrapper