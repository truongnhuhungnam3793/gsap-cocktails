import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText, ScrollTrigger } from "gsap/all"
import { useRef } from "react"
import { useMediaQuery } from "react-responsive"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const videoRef = useRef()
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" })

  useGSAP(() => {
    const heroSplitText = new SplitText(".title", {
      type: "chars, words",
    })

    const paragraphSplitText = new SplitText(".subtitle", {
      type: "lines",
    })

    heroSplitText.chars.forEach((char) => char.classList.add("text-gradient"))

    gsap.from(heroSplitText.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.05,
    })

    gsap.from(paragraphSplitText.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.05,
      delay: 1,
    })

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(
        ".left-leaf",
        {
          y: -200,
        },
        0
      )
      .to(
        ".right-leaf",
        {
          y: 200,
        },
        0
      )

    const startValue = isMobile ? "top 50%" : "center 50%"
    const endValue = isMobile ? "120% top" : "bottom top"

    // Video scroll animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".video video",
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    })

    videoRef.current.onloadedmetadata = () => {
      tl.to(videoRef.current, {
        currentTime: videoRef.current.duration,
      })
    }
  }, [])
  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>

        <img
          src="/images/hero-left-leaf.png"
          alt="left-leaf"
          className="left-leaf"
        />
        <img
          src="/images/hero-right-leaf.png"
          alt="right-leaf"
          className="right-leaf"
        />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Refreshing.</p>
              <p className="subtitle">Sip the Spirit of Summer</p>
            </div>
            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail is made with fresh ingredients and a passion for
                perfecting every pour, whether you're celebrating or simply
                relaxing.
              </p>
              <a href="#cocktails">View Cocktails</a>
            </div>
          </div>
        </div>
      </section>

      <div className="inset-0 video">
        <video
          ref={videoRef}
          src="/videos/output.mp4"
          muted
          playsInline
          preload="auto"
        />
      </div>
    </>
  )
}
export default Hero
