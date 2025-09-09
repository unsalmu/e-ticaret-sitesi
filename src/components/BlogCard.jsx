export default function BlogCard({ post }) {
    return (
      <div className="flex flex-col bg-white shadow-sm group cursor-pointer">
        {/* Post Image */}
        <div className="relative overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* NEW Badge */}
          {post.isNew && (
            <div className="absolute top-4 left-4">
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded shadow">
                NEW
              </span>
            </div>
          )}
        </div>
  
        {/* Post Content */}
        <div className="flex flex-col p-6 flex-1">
          {/* Tags */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs text-blue-400 font-medium">
              {post.tags.primary}
            </span>
            <span className="text-xs text-gray-500">
              {post.tags.secondary}
            </span>
            <span className="text-xs text-gray-500">
              {post.tags.tertiary}
            </span>
          </div>
  
          {/* Title */}
          <h3 className="text-lg font-normal text-gray-900 mb-3 leading-relaxed group-hover:text-blue-500 transition-colors">
            {post.title}
          </h3>
  
          {/* Description */}
          <p className="text-sm text-gray-500 mb-6 leading-relaxed flex-1">
            {post.description}
          </p>
  
          {/* Meta Info */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            {/* Date */}
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>{post.date}</span>
            </div>
  
            {/* Comments */}
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              <span>{post.commentCount} comments</span>
            </div>
          </div>
  
          {/* Learn More Link */}
          <div className="mt-4">
            <a 
              href={post.link} 
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-500 transition-colors group/link"
            >
              Learn More
              <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    )
  }