export default function PricingFaqs() {
  const item = (
    <div className="flex items-start gap-3 py-2 px-16">
      <span className="text-[#23A6F0] font-bold mt-1">{'>'}</span>
      <div>
        <h4 className="text-sm font-bold text-[#252B42] mb-1">the quick fox jumps over the lazy dog</h4>
        <p className="text-sm text-gray-500">Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.</p>
      </div>
    </div>
  )

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#252B42] mb-4">Pricing FAQs</h3>
          <p className="text-sm font-bold text-gray-400 max-w-lg mx-auto">Problems trying to resolve the conflict between the two major realms of Classical physics</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-6">{[0,1,2].map(i => (<div key={i}>{item}</div>))}</div>
          <div className="flex-1 space-y-6">{[3,4,5].map(i => (<div key={i}>{item}</div>))}</div>
        </div>

        <div className="text-center mt-12 text-sm text-gray-600">
          Haven't got your answer? <a href="/contact" className="text-[#23A6F0] font-bold hover:underline">Contact our support</a>
        </div>
      </div>
    </section>
  )
}
