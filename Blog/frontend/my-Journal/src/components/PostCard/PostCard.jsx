import "./PostCard.css";

function PostCard({ post }) {

  return (
    <div className="post-card">

      <h3>
        {post.title}
      </h3>

      <p className="excerpt">
        {post.excerpt}
      </p>

      <div className="post-meta">

        <span>
          {post.category}
        </span>

        <span>
          {post.readTime}
        </span>

      </div>

    </div>
  );
}

export default PostCard;