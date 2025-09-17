import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react"

export default function TeamCta() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h3 className="text-2xl md:text-3xl font-extrabold text-[#252B42] mb-2">Start your 14 days free trial</h3>
        <p className="text-gray-500 max-w-xl mx-auto mb-6 text-sm">Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequat.</p>
        <button className="px-6 py-3 bg-[#23A6F0] text-white font-bold rounded hover:bg-[#23A6F0]/90 mb-6">Try it free now</button>
        <div className="flex items-center justify-center gap-5 text-[#23A6F0]">
          <Twitter className="w-5 h-5" />
          <Facebook className="w-5 h-5" />
          <Instagram className="w-5 h-5" />
          <Linkedin className="w-5 h-5" />
        </div>
      </div>
    </section>
  )
}

