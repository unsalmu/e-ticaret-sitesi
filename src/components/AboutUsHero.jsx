import heroImg from "../assets/aboutushero.png"

export default function AboutUsHero() {
  return (
    <section className="bg-white pt-[60px] md:pt-[85px]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Left text */}
          <div className="px-20 py-24 flex-1 text-center md:text-left">
            <p className="text-xs font-extrabold text-gray-500 tracking-wider mb-7">ABOUT COMPANY</p>
            <h1 className="!text-3xl md:!text-4xl font-extrabold text-[#252B42] mb-7">ABOUT US</h1>
            <p className="text-gray-400 font-medium max-w-md md:max-w-sm mx-auto md:mx-0 mb-7">We know how large objects will act, but things on a small scale</p>
            <button className="px-10 py-3 bg-[#23A6F0] text-white font-bold rounded-sm hover:bg-[#23A6F0]/90">Get Quote Now</button>
          </div>

          {/* Right image */}
          <div className="flex-1 w-full">
            <img src={heroImg} alt="About us" className="w-full h-auto object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

