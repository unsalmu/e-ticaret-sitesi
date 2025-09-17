import { PhoneCall, MapPin, Mail } from "lucide-react"

function Card({ icon, title = "Get Support", emails = ["georgia.young@example.com", "georgia.young@ple.com"], variant = 'light' }) {
  const base = variant === 'dark'
    ? "bg-[#252B42] text-white"
    : "bg-white text-[#252B42]"

  const btn = variant === 'dark'
    ? "text-white border-white"
    : "text-[#23A6F0] border-[#23A6F0]"

  return (
    <div className={`flex flex-col items-center px-8 py-12 font-bold ${base}`}>
      {/* Icon larger, no background */}
      <div className="mb-6 text-[#23A6F0]">
        {icon}
      </div>
      <div className="text-center text-sm mb-4">
        {emails.map((e, i) => (
          <div key={i} className="opacity-80">{e}</div>
        ))}
      </div>
      <div className="font-bold mb-4">{title}</div>
      <button
        className={`px-5 py-2.5 !rounded-full border ${btn}`}
        style={{ borderRadius: '9999px' }}
      >
        Submit Request
      </button>
    </div>
  )
}

import sendIcon from "../assets/arrow-2.png"

export default function ContactCards() {
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <p className="text-xs text-gray-500 text-center font-bold tracking-wider mb-2">VISIT OUR OFFICE</p>
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#252B42] mb-10">We help small businesses <br/>  with big ideas</h2>

        <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-0 md:justify-center md:max-w-4xl mx-auto">
          <div className="flex-1 md:flex-[0_0_26%] md:max-w-xs">
            <Card icon={<PhoneCall className="w-10 h-10" />} />
          </div>
          <div className="flex-1 md:flex-[0_0_26%] md:max-w-xs">
            <Card icon={<MapPin className="w-10 h-10" />} variant="dark" />
          </div>
          <div className="flex-1 md:flex-[0_0_26%] md:max-w-xs">
            <Card
              icon={
                <>
                  <img src={sendIcon} alt="Send" className="w-10 h-10 block md:hidden" />
                  <Mail className="w-10 h-10 hidden md:block" />
                </>
              }
            />
          </div>
        </div>
      </div>
    </section>
  )
}
