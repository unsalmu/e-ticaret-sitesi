import PricingHero from "../components/PricingHero"
import PricingPlans from "../components/PricingPlans"
import PricingFaqs from "../components/PricingFaqs"
import Partners from "../components/Partners"
import TeamCta from "../components/TeamCta"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <PricingHero />
      <PricingPlans />
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-10 text-center">
          <p className="text-sm text-gray-700 mb-6 font-bold">Trusted By Over 4000 Big Companies</p>
          <Partners />
        </div>
      </section>
      <PricingFaqs />
      <TeamCta />
    </div>
  )
}
