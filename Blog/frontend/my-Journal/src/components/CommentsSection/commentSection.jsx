import { useState } from "react";
import { Link } from "react-router-dom";
import "./commentSection.css";

const mockComments = [
  {
    id: 1,
    author: "Alex M.",
    text: "This really resonated with me. The way you framed the idea is sharp.",
    date: "Jun 10, 2025",
  },
  {
    id: 2,
    author: "Sam L.",
    text: "Great read. Would love to see a follow-up on this topic.",
    date: "Jun 11, 2025",
  },
];

export default function CommentSection({ postId, isAuthenticated }) {
  const [comments, setComments] = useState(mockComments);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitting(true);

    // Optimistic update — replace with real API call when backend is ready
    // await postComment(postId, text);
    const newComment = {
      id: Date.now(),
      author: "You",
      text: text.trim(),
      date: "Just now",
    };
    setComments((prev) => [newComment, ...prev]);
    setText("");
    setSubmitting(false);
  };

  return (
    <section className="comment-section">
      <h2 className="comment-heading">{comments.length} Comments</h2>

      {isAuthenticated ? (
        <form className="comment-form" onSubmit={handleSubmit}>
          <textarea
            className="comment-input"
            placeholder="Share your thoughts..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
          />
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
        {comments.map((c) => (
          <div className="comment-item" key={c.id}>
            <div className="comment-item-header">
              <span className="comment-author">{c.author}</span>
              <span className="comment-date">{c.date}</span>
            </div>
            <p className="comment-text">{c.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
