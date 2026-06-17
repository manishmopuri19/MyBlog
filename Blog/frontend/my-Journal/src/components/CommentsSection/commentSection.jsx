import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getComments, createComment } from "../../services/postService";
import "./commentSection.css";

export default function CommentSection({ postId, isAuthenticated }) {
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postId) return;
    setLoadingComments(true);
    getComments(postId)
      .then(setComments)
      .catch(() => setComments([]))
      .finally(() => setLoadingComments(false));
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const newComment = await createComment(postId, text.trim());
      setComments((prev) => [...prev, newComment]);
      setText("");
    } catch {
      setError("Failed to post comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const fmtDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";

  return (
    <section className="comment-section">
      <h2 className="comment-heading">
        {loadingComments ? "Comments" : `${comments.length} Comment${comments.length !== 1 ? "s" : ""}`}
      </h2>

      {isAuthenticated ? (
        <form className="comment-form" onSubmit={handleSubmit}>
          <textarea
            className="comment-input"
            placeholder="Share your thoughts..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
          />
          {error && <p className="comment-error">{error}</p>}
          <button
            className="comment-submit"
            type="submit"
            disabled={submitting || !text.trim()}
          >
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </form>
      ) : (
        <div className="comment-auth-prompt">
          <Link to="/login">Login</Link> to leave a comment.
        </div>
      )}

      <div className="comment-list">
        {loadingComments ? (
          <div className="comment-loading">
            <div className="comment-spinner" />
          </div>
        ) : comments.length === 0 ? (
          <p className="comment-empty">No comments yet. Be the first to share your thoughts.</p>
        ) : (
          comments.map((c) => (
            <div className="comment-item" key={c.id}>
              <div className="comment-item-header">
                <span className="comment-author">{c.author_username ?? "Anonymous"}</span>
                <span className="comment-date">{fmtDate(c.created_at)}</span>
              </div>
              <p className="comment-text">{c.content}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
