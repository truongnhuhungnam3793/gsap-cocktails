import gsap from "gsap"
import { ScrollTrigger, SplitText } from "gsap/all"
import ReactLenis, { useLenis } from "lenis/react"
import Cocktails from "./components/Cocktails"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"

gsap.registerPlugin(ScrollTrigger, SplitText)

const App = () => {
  useLenis()

  return (
    <ReactLenis root>
      <main>
        <Navbar />
        <Hero />
        <Cocktails />
      </main>
    </ReactLenis>
  )
}

export default App
