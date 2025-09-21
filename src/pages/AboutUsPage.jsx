import AboutUsHero from "../components/AboutUsHero"
import ProblemTrying from "../components/ProblemTrying"
import InfoStats from "../components/InfoStats"
import YouTubeContent from "../components/YouTubeContent"
import TeamMembers from "../components/TeamMembers"
import Partners from "../components/Partners"
import WorkWithUs from "../components/WorkWithUs"

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <AboutUsHero />
      <ProblemTrying />
      <InfoStats />
      <YouTubeContent />
      <TeamMembers />
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#252B42] mb-6">Big Companies Are Here</h3>
          <p className="text-xs font-bold text-gray-400 max-w-lg mx-auto mb-10">Problems trying to resolve the conflict between <br/> the two major realms of Classical physics. Newtonian mechanics</p>
          <Partners />
        </div>
      </section>
      <WorkWithUs />
    </div>
  )
}

