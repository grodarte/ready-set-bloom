import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { WristletProvider } from "../context/wristlet";
import { FlowerProvider } from "../context/flower";
import { RibbonProvider } from "../context/ribbon";
import { AccentProvider } from "../context/accent";

function App() {

  return (
    <div>
      <header>
        <h1>Ready Set Bloom</h1>
        <NavBar/>
      </header>
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
