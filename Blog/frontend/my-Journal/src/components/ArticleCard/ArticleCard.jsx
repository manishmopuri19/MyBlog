import { useNavigate } from "react-router-dom";
import "./ArticleCard.css";

function ArticleCard({ post }) {

  const navigate=useNavigate()

  return (

    <div className="article-card" 
    onClick={()=>{
      navigate(`/posts/${post.slug}`)
    }} >

      <span>
        {post.category}
      </span>

      <h3>
        {post.title}
      </h3>

      <p>
        {post.excerpt}
      </p>

      <small>
        {post.readTime}
      </small>

    </div>

  );

}

export default ArticleCard;