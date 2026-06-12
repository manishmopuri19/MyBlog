import "./ArticleCard.css";

function ArticleCard({ post }) {

  return (

    <div className="article-card">

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