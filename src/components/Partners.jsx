import b1 from "../assets/fa-brands-1.png"
import b2 from "../assets/fa-brands-2.png"
import b3 from "../assets/fa-brands-3.png"
import b4 from "../assets/fa-brands-4.png"
import b5 from "../assets/fa-brands-5.png"
import b6 from "../assets/fa-brands-6.png"

export default function Partners() {
  const brands = [b1, b2, b3, b4, b5, b6]
  return (
    <section className="px-4">
      <div className="max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
          {brands.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Brand ${i + 1}`}
              className="h-10 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
