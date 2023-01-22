import { useState } from "react"

const Blog = ({blog}) => {

  const [showAll, setShowAll] = useState(false)

  return (  
    <div className="blogStyle">
      {blog.title} {blog.author} <button onClick={console.log('wadap')}>view</button>
    </div>  
  )}

export default Blog