import neuralCouple from "../assets/neural-universe-couple.png"

export default function NeuralUniverse() {
    return (
      <section className="pt-0 pb-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Mobile First: Flex Column -> Desktop: Flex Row */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            
            {/* Content - Mobile: First, Desktop: Right Side */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 order-1 md:order-2 md:pr-16 lg:pr-20 xl:pr-24 pt-24 md:pt-16">
              {/* Eyebrow */}
              <p className="text-xs text-gray-500 mb-4 tracking-wider">
                SUMMER 2020
              </p>
  
              {/* Main Heading */}
              <h2 className="text-4xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6" style={{ lineHeight: '1.2' }}>
                <span className="block md:inline">Part of the</span>
                <span className="block md:inline"> Neural</span><br className="hidden md:block" />
                <span className="block md:inline">Universe</span>
              </h2>
  
              {/* Description */}
              <p className="text-gray-600 md:text-gray-500 text-base lg:text-lg xl:text-xl mb-8 max-w-md md:!leading-6" 
                 style={{ lineHeight: '0.7' }}>
                <span className="block md:inline">We know how large</span><br className="md:hidden" />
                <span className="block md:inline"> objects will act, but</span><br />
                <span className="block md:inline">things on a small scale.</span>
              </p>
  
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto max-w-md sm:max-w-none">
                <button className="px-4 py-3 md:px-5 md:py-2 lg:px-6 lg:py-3 xl:px-8 xl:py-4 bg-[#23A6F0] md:bg-[#2DC071] text-white text-xs lg:text-sm xl:text-base font-bold rounded-[0.5px] md:rounded-[1px] hover:bg-[#23A6F0]/90 md:hover:bg-[#2DC071]/90 transition-colors">
                  BUY NOW
                </button>
                <button className="px-4 py-3 md:px-5 md:py-2 lg:px-6 lg:py-3 xl:px-8 xl:py-4 bg-gray-50 border-2 border-[#23A6F0] md:border-[#2DC071] text-[#23A6F0] md:text-[#2DC071] text-xs lg:text-sm xl:text-base font-bold rounded-[0.5px] md:rounded-[1px] hover:bg-[#23A6F0] md:hover:bg-[#2DC071] hover:text-white transition-colors" style={{borderColor: window.innerWidth >= 768 ? '#2DC071' : '#23A6F0'}}>
                  <span className="md:hidden">LEARN MORE</span>
                  <span className="hidden md:inline">READ MORE</span>
                </button>
              </div>
            </div>
  
            {/* Image - Mobile: Second, Desktop: Left Side */}
            <div className="flex-1 order-2 md:order-1 w-full pl-[42px] pr-4 md:px-0 md:pl-8 lg:pl-12 xl:pl-16">
              <div className="relative">
                <img
                  src={neuralCouple}
                  alt="Couple wearing plaid clothing"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>
  
          </div>
        </div>
      </section>
    )
  }
