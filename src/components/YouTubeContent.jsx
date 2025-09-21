import videoImg from "../assets/videocard.png"

export default function YouTubeContent() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto md:px-32 px-12 py-18">
        <div className="rounded-xl overflow-hidden">
          <div className="relative">
            <img src={videoImg} alt="Video cover" className="w-full h-auto object-cover" />
            <button className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#23A6F0] text-white flex items-center justify-center">
              <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor"><path d="M6 4l10 6-10 6V4z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

