import { Outlet } from "react-router-dom";
import { WristletProvider } from "../context/wristlet";
import { FlowerProvider } from "../context/flower";
import { RibbonProvider } from "../context/ribbon";
import { AccentProvider } from "../context/accent";

function App() {

  return (
    <div>
      <header>
        {/* NavBar Element*/}
        <h1>Insert NavBar Here</h1>
      </header>
      <h1>Project Client</h1>
      <WristletProvider>
        <FlowerProvider>
          <RibbonProvider>
            <AccentProvider>
              <Outlet/>
            </AccentProvider>
          </RibbonProvider>
        </FlowerProvider>
      </WristletProvider>
    </div>
  )
}

export default App;
