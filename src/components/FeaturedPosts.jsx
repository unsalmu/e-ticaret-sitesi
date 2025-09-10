import BlogCard from './BlogCard'
import blog1 from "../assets/blog-1.png"
import blog2 from "../assets/blog-2.png"
import blog3 from "../assets/blog-3.png"

export default function FeaturedPosts() {
  // Sample blog posts data
  const posts = [
    {
      id: 1,
      image: blog1,
      isNew: true,
      tags: {
        primary: "Google",
        secondary: "Trending", 
        tertiary: "New"
      },
      title: "Loudest à la Madison #1 (L'integral)",
      description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
      date: "22 April 2021",
      commentCount: 10,
      link: "/blog/loudest-la-madison-1"
    },
    {
      id: 2, 
      image: blog2,
      isNew: true,
      tags: {
        primary: "Google",
        secondary: "Trending",
        tertiary: "New" 
      },
      title: "Loudest à la Madison #1 (L'integral)",
      description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
      date: "22 April 2021", 
      commentCount: 10,
      link: "/blog/loudest-la-madison-2"
    },
    {
      id: 3,
      image: blog3, 
      isNew: true,
      tags: {
        primary: "Google",
        secondary: "Trending",
        tertiary: "New"
      },
      title: "Loudest à la Madison #1 (L'integral)",
      description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
      date: "22 April 2021",
      commentCount: 10, 
      link: "/blog/loudest-la-madison-3"
    }
  ]

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm text-blue-500 mb-4 font-bold tracking-wider">
            Practice Advice
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Featured Posts
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
            Problems trying to resolve the conflict between 
            the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>

        {/* Blog Cards - Mobile First Flex Layout */}
        <div className="flex flex-col md:flex-row gap-4 max-w-5xl mx-auto px-8">
          {posts.map(post => (
            <div key={post.id} className="flex-1">
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
