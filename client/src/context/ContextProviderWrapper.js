import { SettingsProvider } from "./settings";
import { OrderPanelProvider } from "./orderpanel";
import { EventProvider } from "../context/event";
import { OrderProvider } from "./order";
import { ItemProvider } from "./item";
import { WristletProvider } from "../context/wristlet";
import { FlowerProvider } from "../context/flower";
import { AccentProvider } from "../context/accent";
import { DateProvider } from "./DateContext";

function ContextProviderWrapper({ children }) {
    return (
        <OrderPanelProvider>
            <SettingsProvider>
                <EventProvider>
                    <OrderProvider>
                        <ItemProvider>
                            <WristletProvider>
                                <FlowerProvider>
                                    <AccentProvider>
                                        <DateProvider>
                                            {children}
                                        </DateProvider>
                                    </AccentProvider>
                                </FlowerProvider>
                            </WristletProvider>
                        </ItemProvider>
                    </OrderProvider>
                </EventProvider>
            </SettingsProvider>
        </OrderPanelProvider>
    )
}

export default ContextProviderWrapper