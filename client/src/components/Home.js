import { useContext } from "react"
import { WristletContext } from "../context/wristlet"
import { FlowerContext } from "../context/flower"
import { RibbonContext } from "../context/ribbon"
import { AccentContext } from "../context/accent"


function Home() {
    const { wristlets } = useContext(WristletContext)
    const { flowers } = useContext(FlowerContext)
    const { ribbons } = useContext(RibbonContext)
    const { accents } = useContext(AccentContext)

    const wristletElements = wristlets.map(wristlet=>{
        return <p key={wristlet.id}>{wristlet.color} {wristlet.style}</p>
    })

    const flowerElements = flowers.map(flower=>{
        return <p key={flower.id}>{flower.color} {flower.name}</p>
    })

    const ribbonElements = ribbons.map(ribbon=>{
        return <p key={ribbon.id}>{ribbon.color} {ribbon.name}</p>
    })

    const accentElements = accents.map(accent=>{
        return <p key={accent.id}>{accent.color} {accent.name}</p>
    })

    return (
        <div>
            <h2>Home Component</h2>
            <h3>Wristlets:</h3>
            {wristletElements}
            <h3>Flowers:</h3>
            {flowerElements}
            <h3>Ribbons:</h3>
            {ribbonElements}
            <h3>Accents:</h3>
            {accentElements}
        </div>
    )
}

export default Home