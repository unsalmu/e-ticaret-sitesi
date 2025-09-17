import TeamHero from "../components/TeamHero"
import TeamMembers from "../components/TeamMembers"
import TeamCta from "../components/TeamCta"

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white py-10">
      {/* Heading + breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 pt-[60px] md:pt-[85px] text-center">
        <p className="text-xs text-gray-500 font-bold tracking-wider mb-2">WHAT WE DO</p>
        <h1 className="!text-3xl md:!text-4xl font-extrabold text-[#252B42] mb-4">Innovation tailored for you</h1>
        <nav className="text-xs text-gray-500 mb-6">Home <span className="mx-1">›</span> Team</nav>
      </div>

      <TeamHero />
      <TeamMembers />
      <TeamCta />
    </div>
  )
}
