import { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BlogDetail.css";
import { usePost } from "../../hooks/usePost";
import { useAuth } from "../../context/AuthContext";
import NavBar from "../../components/NavBar/NavBar";
import CommentSection from "../../components/CommentsSection/commentSection";
import BlogScene from "../../components/BlogScene/BlogScene";

function BlogDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { post, loading, error } = usePost(slug);
  const { isAuthenticated } = useAuth();
  const commentsRef = useRef(null);

  // Optimistic like state — syncs with post data once loaded
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // Set initial like count once post loads
  const initializedRef = useRef(false);
  if (post && !initializedRef.current) {
    setLikeCount(post.likes ?? 0);
    initializedRef.current = true;
  }

  const handleLike = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    // TODO: await likePost(post.id) when backend is ready
  };

  const scrollToComments = () => {
    commentsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="blog-state">
        <NavBar />
        <div className="blog-state-content">
          <div className="blog-spinner" />
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-state">
        <NavBar />
        <div className="blog-state-content">
          <h2>Post not found</h2>
          <p>This post might have moved or doesn't exist.</p>
          <button onClick={() => navigate("/reader")}>← Back to posts</button>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-detail-page">
      <NavBar />

      {/* ── Header: title left, 3D shape right ── */}
      <header className="post-header">
        <div className="post-header-text">
          <div className="post-meta-top">
            <span className="post-category">{post.category}</span>
            <span className="post-read-time">{post.readTime || "5 min read"}</span>
          </div>

          <h1 className="post-title">{post.title}</h1>

          <div className="post-meta-bottom">
            <span className="post-author">{post.author || "MAG"}</span>
            <span className="meta-dot">·</span>
            <span>{post.date || "Jun 2025"}</span>
          </div>
        </div>

        <div className="post-header-scene">
          <BlogScene />
        </div>
      </header>

      {/* ── Article body ── */}
      <main className="post-body">
        <article className="post-content">
          {(post.content || post.excerpt || "")
            .split("\n\n")
            .filter(Boolean)
            .map((para, i) => (
              <p key={i}>{para}</p>
            ))}
        </article>

        {/* ── Action bar ── */}
        <div className="post-actions">
          <button
            className={`action-btn like-btn${liked ? " liked" : ""}`}
            onClick={handleLike}
            title={isAuthenticated ? "Like this post" : "Login to like"}
          >
            <span className="action-icon">{liked ? "♥" : "♡"}</span>
            <span>{likeCount}</span>
          </button>

          <button className="action-btn comment-btn" onClick={scrollToComments}>
            <span className="action-icon">◯</span>
            <span>Comments</span>
          </button>

          <button
            className="action-btn share-btn"
            onClick={() => navigator.clipboard?.writeText(window.location.href)}
            title="Copy link"
          >
            Share ↗
          </button>

          <button
            className="action-btn back-btn"
            onClick={() => navigate("/reader")}
          >
            ← Back
          </button>
        </div>
      </main>

      {/* ── Comments ── */}
      <section ref={commentsRef} className="comments-wrapper">
        <CommentSection postId={post.id} isAuthenticated={isAuthenticated} />
      </section>
    </div>
  );
}

export default BlogDetails;
