import { Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import contactImg from "../assets/contact-image.png"

export default function ContactHero() {
  return (
    <section className="bg-white pt-[60px] md:pt-[85px]">
      <div className="max-w-7xl mx-auto px-20 py-2 md:py-2">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Left content */}
          <div className="flex-1 py-20 text-center md:text-left">
            <p className="text-xs font-bold text-gray-500 tracking-wider mb-3">CONTACT US</p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#252B42] mb-6 leading-tight">Get in touch <br/> today!</h1>
            <p className="text-gray-600 max-w-md mb-6">We know how large objects will act, but things on a small scale.</p>

            <div className="space-y-2 mb-6 text-[#252B42] font-bold">
              <div className="flex items-center justify-center md:justify-start gap-2"><Phone className="w-4 h-4" /><span>Phone : +451 215 215</span></div>
              <div className="flex items-center justify-center md:justify-start gap-2"><Mail className="w-4 h-4" /><span>Fax : +451 215 215</span></div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4 text-[#23A6F0]">
              <a aria-label="Twitter" href="#" className="hover:opacity-80"><Twitter className="w-5 h-5" /></a>
              <a aria-label="Facebook" href="#" className="hover:opacity-80"><Facebook className="w-5 h-5" /></a>
              <a aria-label="Instagram" href="#" className="hover:opacity-80"><Instagram className="w-5 h-5" /></a>
              <a aria-label="LinkedIn" href="#" className="hover:opacity-80"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Right image */}
          <div className="flex-1 w-full">
            <img src={contactImg} alt="Happy people with shopping bags" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  )
}
