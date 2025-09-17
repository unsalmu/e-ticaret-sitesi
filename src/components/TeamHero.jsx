import img1 from "../assets/teamHero-1.png"
import img2 from "../assets/teamHero-2.png"
import img3 from "../assets/teamHero-3.png"
import img4 from "../assets/teamHero-4.png"
import img5 from "../assets/teamHero-5.png"

export default function TeamHero() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Flex layout: Left big, Right 2x2 tiles. Heights locked on md+ to align. */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left large image */}
          <div className="w-full md:flex-[2]">
            <div className="relative w-full h-64 md:h-[520px]">
              <img src={img1} alt="Team hero 1" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
          {/* Right collage */}
          <div className="w-full md:flex-[1]">
            <div className="flex flex-col gap-4 h-auto md:h-[520px]">
              {/* Top row */}
              <div className="flex gap-4 flex-1">
                <div className="flex-1 h-40 md:h-auto md:relative">
                  <img src={img2} alt="Team hero 2" className="w-full h-full object-cover md:absolute md:inset-0" />
                </div>
                <div className="flex-1 h-40 md:h-auto md:relative">
                  <img src={img3} alt="Team hero 3" className="w-full h-full object-cover md:absolute md:inset-0" />
                </div>
              </div>
              {/* Bottom row */}
              <div className="flex gap-4 flex-1">
                <div className="flex-1 h-40 md:h-auto md:relative">
                  <img src={img4} alt="Team hero 4" className="w-full h-full object-cover md:absolute md:inset-0" />
                </div>
                <div className="flex-1 h-40 md:h-auto md:relative">
                  <img src={img5} alt="Team hero 5" className="w-full h-full object-cover md:absolute md:inset-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
