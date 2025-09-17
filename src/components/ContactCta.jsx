import arrowImg from "../assets/arrow-2.png"

export default function ContactCta() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        {/* Decorative arrow image on top */}
        <div className="flex justify-center mb-6">
          <img src={arrowImg} alt="Arrow" className="w-14 h-auto object-contain" />
        </div>
        <p className="text-xs font-bold text-gray-500 tracking-wider mb-2">WE CAN'T WAIT TO MEET YOU</p>
        <h3 className="text-4xl md:text-5xl font-extrabold text-[#252B42] mb-6">Let's Talk</h3>
        <button className="px-6 py-3 bg-[#23A6F0] text-white font-bold rounded hover:bg-[#23A6F0]/90">Try it free now</button>
      </div>
    </section>
  )
}
