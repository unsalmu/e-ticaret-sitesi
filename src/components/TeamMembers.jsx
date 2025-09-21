import memberImg from "../assets/teamMember-1.jpg"
import { Facebook, Instagram, Twitter } from "lucide-react"

function MemberCard({ name = "Username", role = "Profession" }) {
  return (
    <div className="flex flex-col items-center text-center">
      <img src={memberImg} alt={name} className="w-full h-auto object-cover" />
      <div className="mt-4">
        <div className="text-sm font-bold text-[#252B42]">{name}</div>
        <div className="text-xs text-gray-500">{role}</div>
      </div>
      <div className="flex items-center gap-3 text-[#23A6F0] mt-3">
        <a href="#" aria-label="Facebook"><Facebook className="w-4 h-4" /></a>
        <a href="#" aria-label="Instagram"><Instagram className="w-4 h-4" /></a>
        <a href="#" aria-label="Twitter"><Twitter className="w-4 h-4" /></a>
      </div>
    </div>
  )
}

export default function TeamMembers() {
  const members = Array.from({ length: 9 }, () => ({ name: "Username", role: "Profession" }))
  return (
    <section className="bg-white px-30">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center text-[#252B42] mb-10 py-5">Meet Our Team</h2>

        {/* Flex rows (no grid) */}
        <div className="flex flex-col gap-10">
          {/* Render in rows of 3 on desktop */}
          {[0, 3, 6].map((start) => (
            <div key={start} className="flex flex-col md:flex-row gap-6">
              {members.slice(start, start + 3).map((m, i) => (
                <div key={start + i} className="flex-1 min-w-0">
                  <MemberCard name={m.name} role={m.role} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

