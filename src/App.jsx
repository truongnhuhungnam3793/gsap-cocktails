import gsap from "gsap"
import { ScrollTrigger, SplitText } from "gsap/all"
import ReactLenis, { useLenis } from "lenis/react"
import About from "./components/About"
import Art from "./components/Art"
import Cocktails from "./components/Cocktails"
import Contact from "./components/Contact"
import Hero from "./components/Hero"
import Menu from "./components/Menu"
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
        <About />
        <Art />
        <Menu />
        <Contact />
      </main>
    </ReactLenis>
  )
}

export default App
