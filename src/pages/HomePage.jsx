// src/pages/HomePage.jsx
import HeroCarousel from "../components/HeroCarousel"
import EditorsPick from "../components/EditorsPick"
import FeaturedProducts from "../components/FeaturedProducts"
import NeuralUniverse from "../components/NeuralUniverse"
import FeaturedPosts from "../components/FeaturedPosts"

export default function HomePage() {
  return (
    <div className="pt-[60px] md:pt-[85px]" style={{ marginTop: 'var(--mobile-menu-offset, 0px)' }}>
      <HeroCarousel />
      <EditorsPick />
      <FeaturedProducts />
      <HeroCarousel />
      <NeuralUniverse />
      <FeaturedPosts />
    </div>
  )
}
