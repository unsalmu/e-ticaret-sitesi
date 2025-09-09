import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import hero1 from "../assets/carousel1.png"
import hero2Background from "../assets/carousel2-bg.jpg"
import hero2Model from "../assets/carousel2-man.png"

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      img: hero1,
      eyebrow: "SUMMER 2020",
      title: "NEW COLLECTION",
      mobileTitle: "NEW\nCOLLECTION",
      text: "We know how large objects will act,\n but things on a small scale.",
      cta: "SHOP NOW",
      type: "collection"
    },
    {
      backgroundImg: hero2Background, // yeşil arka plan
      modelImg: hero2Model, // erkek model
      eyebrow: "SUMMER 2020",
      title: "Vita Classic Product",
      mobileTitle: "Vita Classic\nProduct",
      text: "We know how large objects will act, We know how are objects will act, We know",
      cta: "ADD TO CART",
      price: "$16.48",
      type: "product"
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const currentSlideData = slides[currentSlide]

  return (
    <section className="relative w-full overflow-hidden" style={{ marginTop: 'var(--mobile-menu-offset, 0px)' }}>
      <div className="w-full h-[600px] sm:h-[620px] md:h-[640px] relative">
        
        {/* Background Layer */}
        {currentSlideData.type === "collection" ? (
          // Single image for collection slides
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentSlideData.img})` }}
          />
        ) : (
          // Layered images for product slides
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${currentSlideData.backgroundImg})` }}
            />
            <div className="absolute inset-0 flex items-end justify-end">
              <img 
                src={currentSlideData.modelImg} 
                alt={currentSlideData.title}
                className="h-4/5 object-contain object-bottom translate-x-60 md:translate-x-0"
              />
            </div>
          </>
        )}

        {/* Content Layer */}
        <div className="relative z-10 h-full flex">
          <div className="mx-auto w-full max-w-7xl px-24 md:pl-32 md:pr-6 lg:pl-30 lg:pr-8 flex font-bold justify-center md:justify-start">
            <div className="flex flex-col justify-center max-w-xl text-[#DEDEDE] text-center md:text-left">
              <p className="text-sm tracking-widest mb-8 opacity-90">
                {currentSlideData.eyebrow}
              </p>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 whitespace-pre-line">
                <span className="md:hidden">{currentSlideData.mobileTitle || currentSlideData.title}</span>
                <span className="hidden md:inline">{currentSlideData.title}</span>
              </h1>
              <p className="font-normal text-base sm:text-lg mb-6 whitespace-pre-line">
                {currentSlideData.text}
              </p>
              
              {/* CTA Section with conditional price */}
              <div className="flex items-center gap-4 justify-center md:justify-start">
                {currentSlideData.price && (
                  <span className="text-2xl font-bold text-white">
                    {currentSlideData.price}
                  </span>
                )}
                <button className="px-6 py-3 rounded bg-[#2DC071] hover:opacity-95 transition-opacity">
                  {currentSlideData.cta}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 hover:bg-white/30 text-[#DEDEDE] p-2 rounded-full transition-all duration-200 z-20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-12 h-12" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-white/30 text-[#DEDEDE] p-2 rounded-full transition-all duration-200 z-20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-12 h-12" />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide 
                  ? 'bg-white' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}