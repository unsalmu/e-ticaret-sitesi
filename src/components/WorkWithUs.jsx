import workImg from "../assets/workwithus.png"

export default function WorkWithUs() {
  return (
    <section className="bg-white">
      <div className="w-full">
        <div className="flex flex-col md:flex-row items-stretch overflow-hidden">
          <div className="flex-1 bg-[#2A7CC7] text-white px-6 sm:px-8 md:px-12 lg:px-16 xl:px-40 py-16 sm:py-20 md:py-24 lg:py-32 xl:py-48 text-center md:text-left">
            <p className="text-xs font-bold tracking-wider mb-3">WORK WITH US</p>
            <h3 className="text-3xl md:text-4xl font-extrabold mb-4">Now Let's grow Yours</h3>
            <p className="text-sm text-white/90 max-w-md mb-6 mx-auto md:mx-0">The gradual accumulation of information about atomic and small-scale behaviour during the first quarter of the 20th</p>
            <button className="px-8 py-2 border border-white text-white font-bold rounded-sm">Button</button>
          </div>
          <div className="flex-1 hidden md:block">
            <img src={workImg} alt="Work with us" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

