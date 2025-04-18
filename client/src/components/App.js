import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import ContextProviderWrapper from "../context/ContextProviderWrapper";

function App() {

  return (
    <div>
      <header>
        <h1>Ready Set Bloom</h1>
        <NavBar/>
      </header>
      <ContextProviderWrapper>
        <Outlet/>
      </ContextProviderWrapper>
    </div>
  )
}

export default App;
