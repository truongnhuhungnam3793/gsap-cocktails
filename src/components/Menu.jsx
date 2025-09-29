"use client"

import { useRef, useState } from "react"
import { sliderLists } from "../../constants"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const Menu = () => {
  const contentRef = useRef()
  const [currentIndex, setCurrentIndex] = useState(0)

  useGSAP(() => {
    gsap.fromTo(
      "#title",
      {
        opacity: 0,
        yPercent: 100,
      },
      {
        opacity: 1,
        yPercent: 0,
        duration: 1,
        ease: "power1.inOut",
      }
    )

    gsap.fromTo(
      ".details > *",
      {
        opacity: 0,
        yPercent: 100,
      },
      {
        opacity: 1,
        yPercent: 0,
        duration: 1,
        ease: "power1.inOut",
      }
    )

    gsap.fromTo(
      ".cocktail img",
      {
        opacity: 0,
        xPercent: -100,
      },
      {
        opacity: 1,
        xPercent: 0,
        duration: 1,
        ease: "power1.inOut",
      }
    )

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#menu",
          // markers: true,
          start: "top 66%",
          end: "bottom bottom",
          scrub: true,
        },
      })
      .from("#m-right-leaf", {
        xPercent: 100,
        duration: 1,
        ease: "power1.inOut",
      })
      .from("#m-left-leaf", {
        xPercent: -100,
        duration: 1,
        ease: "power1.inOut",
      })
  }, [currentIndex])

  const totalSlides = sliderLists.length

  const goToSlide = (index) => {
    const newIndex = (index + totalSlides) % totalSlides
    setCurrentIndex(newIndex)
  }

  const getCocktailAt = (indexOffset) => {
    return sliderLists[(currentIndex + indexOffset + totalSlides) % totalSlides]
  }

  const currentCocktail = getCocktailAt(0)
  const previousCocktail = getCocktailAt(-1)
  const nextCocktail = getCocktailAt(1)

  return (
    <section id="menu" aria-label="menu-heading">
      <img
        src="/images/slider-left-leaf.png"
        alt="left-leaf"
        id="m-left-leaf"
      />
      <img
        src="/images/slider-right-leaf.png"
        alt="right-leaf"
        id="m-right-leaf"
      />

      <h2 id="menu-heading" className="sr-only">
        Cocktails Menu
      </h2>

      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {sliderLists.map((cocktail, index) => {
          const isActive = index === currentIndex

          return (
            <button
              key={cocktail.id}
              className={
                isActive
                  ? "text-white border-white"
                  : "text-white/50 border-white/50"
              }
              onClick={() => goToSlide(index)}
            >
              {cocktail.name}
            </button>
          )
        })}
      </nav>

      <div className="content">
        <div className="arrows">
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex - 1)}
          >
            <span>{previousCocktail.name}</span>
            <img
              src="/images/right-arrow.png"
              alt="arrow-right"
              aria-hidden="true"
              className="inline"
            />
          </button>
          <button
            className="text-right"
            onClick={() => goToSlide(currentIndex + 1)}
          >
            <span>{nextCocktail.name}</span>
            <img
              src="/images/left-arrow.png"
              alt="arrow-left"
              aria-hidden="true"
              className="inline"
            />
          </button>
        </div>

        <div className="cocktail">
          <img
            src={currentCocktail.image}
            alt={currentCocktail.name}
            className="object-contain"
          />
          <div className="recipe">
            <div ref={contentRef} className="info">
              <p>Recipe for:</p>
              <p id="title">{currentCocktail.name}</p>
            </div>
            <div className="details">
              <h2>{currentCocktail.title}</h2>
              <p>{currentCocktail.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Menu
