import { useState } from "react"

function Check({ dim = false }) {
  return (
    <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${dim ? 'bg-gray-300' : 'bg-emerald-500'}`}>
      <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor"><path d="M16.707 5.293a1 1 0 010 1.414l-7.364 7.364a1 1 0 01-1.414 0L3.293 9.829a1 1 0 111.414-1.414l3.02 3.02 6.657-6.657a1 1 0 011.414 0z"/></svg>
    </span>
  )
}

function PlanCard({ title, desc, price, highlight = false, features }) {
  return (
    <div className={`flex-1 p-6 border border-[#23A6F0] rounded-lg ${highlight ? 'bg-[#252B42] text-white md:py-12' : 'bg-white text-[#252B42] md:py-8'} flex flex-col`}>
      <div className="text-center mb-6 mt-2">
        <div className="text-base md:text-lg font-extrabold tracking-wider mb-3">{title}</div>
        <div className={`text-xs ${highlight ? 'text-white/80' : 'text-gray-500'}`}>{desc}</div>
      </div>
      <div className="text-center mb-6">
        <span className="text-3xl font-extrabold text-[#23A6F0]">{price}</span>
        <span className={`ml-1 text-xs ${highlight ? 'text-white/80' : 'text-gray-500'}`}>Per Month</span>
      </div>
      <ul className="space-y-3 mb-6 text-sm font-bold">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3">
            <Check dim={!f.ok} />
            <span className={`${highlight ? 'text-white' : 'text-gray-700'}`}>{f.text}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto text-center">
        <button className={`px-7 py-3 rounded-md text-xs ${highlight ? 'bg-[#23A6F0] text-white' : 'bg-[#23A6F0] text-white'} font-bold`}>Try for free</button>
      </div>
    </div>
  )
}

export default function PricingPlans() {
  const [yearly, setYearly] = useState(false)
  const price = (monthly) => yearly ? `$${(monthly*12*0.75).toFixed(2)}` : `${monthly}$`

  const features = [
    { text: 'Unlimited product updates', ok: true },
    { text: 'Unlimited product updates', ok: true },
    { text: 'Unlimited product updates', ok: true },
    { text: '1GB Cloud storage', ok: false },
    { text: 'Email and community support', ok: false },
  ]

  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:4xl font-extrabold text-[#252B42] mb-4">Pricing</h2>
          <p className="text-xs font-bold text-gray-400 max-w-md mx-auto mb-6">Problems trying to resolve the conflict between the two major realms of Classical physics. Newtonian mechanics</p>
          <div className="flex items-center justify-center gap-3 mt-4 mb-16">
            <span className="text-xs font-bold text-gray-600">Monthly</span>
            <button 
              onClick={() => setYearly(v => !v)} 
              className={`w-12 h-6 !rounded-full relative border ${yearly ? 'bg-[#23A6F0] border-[#23A6F0]' : 'bg-white border-[#23A6F0]'}`} 
              aria-label="Toggle yearly pricing"
              style={{ borderRadius: '9999px' }}
            >
              <span 
                className={`absolute top-0.5 ${yearly ? 'right-0.5' : 'left-0.5'} w-5 h-5 !rounded-full bg-gray-200 transition-all`} 
                style={{ borderRadius: '9999px' }}
              />
            </button>
            <span className="text-xs font-bold text-gray-600">Yearly</span>
            <span className="font-bold text-xs bg-blue-200 text-[#23A6F0] px-5 py-3 rounded-full">Save 25%</span>
          </div>
        </div>

        {/* Plans - flex only */}
        <div className="flex flex-col md:flex-row md:justify-center md:items-end gap-6 md:gap-0">
          <div className="flex-1 md:flex-[0_0_23%]">
            <PlanCard title="FREE" desc="Organize across all apps by hand" price={price(0)} features={features} />
          </div>
          <div className="flex-1 md:flex-[0_0_23%]">
            <PlanCard title="STANDARD" desc="Organize across all apps by hand" price={price(9.99)} highlight features={features} />
          </div>
          <div className="flex-1 md:flex-[0_0_23%]">
            <PlanCard title="PREMIUM" desc="Organize across all apps by hand" price={price(19.99)} features={features} />
          </div>
        </div>
      </div>
    </section>
  )
}
