export default function InfoStats() {
  const stats = [
    { n: '15K', label: 'Happy Customers' },
    { n: '150K', label: 'Monthly Visitors' },
    { n: '15', label: 'Countries Worldwide' },
    { n: '100+', label: 'Top Partners' },
  ]
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row text-center gap-8 md:gap-0">
          {stats.map((s, i) => (
            <div key={i} className="flex-1">
              <div className="text-3xl md:text-4xl font-extrabold text-[#252B42]">{s.n}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

