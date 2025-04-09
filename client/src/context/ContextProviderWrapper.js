import { EventProvider } from "../context/event";
import { WristletProvider } from "../context/wristlet";
import { FlowerProvider } from "../context/flower";
import { RibbonProvider } from "../context/ribbon";
import { AccentProvider } from "../context/accent";

function ContextProviderWrapper({ children }) {
    return (
        <EventProvider>
            <WristletProvider>
                <FlowerProvider>
                    <RibbonProvider>
                        <AccentProvider>
                            {children}
                        </AccentProvider>
                    </RibbonProvider>
                </FlowerProvider>
            </WristletProvider>
        </EventProvider>
    )
}

export default ContextProviderWrapper