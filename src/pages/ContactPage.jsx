import ContactHero from "../components/ContactHero"
import ContactCards from "../components/ContactCards"
import ContactCta from "../components/ContactCta"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <ContactHero />
      <ContactCards />
      <ContactCta />
    </div>
  )
}

