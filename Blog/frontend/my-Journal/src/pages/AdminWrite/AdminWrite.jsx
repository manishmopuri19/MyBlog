import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import {
  getAllPostsAdmin, createPost, updatePost,
  deletePost, publishPost, unpublishPost,
} from "../../services/postService";
import "./AdminWrite.css";

const CATEGORIES = [
  "Personal", "Technology", "Philosophy", "Concepts",
  "Fake Simulations", "Research", "Life Experiments", "Case Studies",
];

const EMPTY_FORM = { title: "", content: "", category: "Personal", is_published: false };

export default function AdminWrite() {
  const [view, setView] = useState("list");
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => { fetchPosts(); }, []);

  async function fetchPosts() {
    setLoadingPosts(true);
    try {
      const data = await getAllPostsAdmin();
      setPosts(data);
    } catch {
      setMessage({ type: "error", text: "Failed to load posts." });
    } finally {
      setLoadingPosts(false);
    }
  }

  function startNew() {
    setForm(EMPTY_FORM);
    setEditingPost(null);
    setMessage(null);
    setView("write");
  }

  function startEdit(post) {
    setForm({
      title: post.title,
      content: post.content,
      category: post.category,
      is_published: post.is_published,
    });
    setEditingPost(post);
    setMessage(null);
    setView("edit");
  }

  function backToList() {
    setView("list");
    setEditingPost(null);
    setMessage(null);
  }

  async function handleSubmit(e) {
    e?.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    setSubmitting(true);
    setMessage(null);
    try {
      if (editingPost) {
        await updatePost(editingPost.id, form);
        setMessage({ type: "success", text: "Post updated." });
      } else {
        await createPost({ ...form, tag_ids: [] });
        setMessage({ type: "success", text: "Post created." });
      }
      await fetchPosts();
      setTimeout(backToList, 1000);
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.detail || "Something went wrong." });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this post? This cannot be undone.")) return;
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      setMessage({ type: "error", text: "Delete failed." });
    }
  }

  async function handleTogglePublish(post) {
    try {
      if (post.is_published) {
        await unpublishPost(post.id);
      } else {
        await publishPost(post.id);
      }
      fetchPosts();
    } catch {
      setMessage({ type: "error", text: "Status update failed." });
    }
  }

  // ── List view ─────────────────────────────────────────────
  if (view === "list") {
    return (
      <div className="admin-page">
        <NavBar />
        <div className="admin-container">
          <div className="admin-header">
            <div>
              <h1 className="admin-title">Dashboard</h1>
              <p className="admin-subtitle">
                {posts.length} post{posts.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button className="admin-new-btn" onClick={startNew}>+ New Post</button>
          </div>

          {message && (
            <div className={`admin-message ${message.type}`}>{message.text}</div>
          )}

          {loadingPosts ? (
            <div className="admin-loading"><div className="admin-spinner" /></div>
          ) : posts.length === 0 ? (
            <div className="admin-empty">
              <p>No posts yet.</p>
              <button onClick={startNew}>Write your first post →</button>
            </div>
          ) : (
            <div className="post-table">
              {posts.map((post) => (
                <div className="post-row" key={post.id}>
                  <div className="post-row-main">
                    <span className={`status-dot ${post.is_published ? "published" : "draft"}`} />
                    <div className="post-row-info">
                      <span className="post-row-title">{post.title}</span>
                      <span className="post-row-meta">
                        {post.category} · {post.is_published ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>
                  <div className="post-row-actions">
                    <button className="row-btn" onClick={() => handleTogglePublish(post)}>
                      {post.is_published ? "Unpublish" : "Publish"}
                    </button>
                    <button className="row-btn" onClick={() => startEdit(post)}>Edit</button>
                    <button className="row-btn danger" onClick={() => handleDelete(post.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Write / Edit view ──────────────────────────────────────
  return (
    <div className="admin-page write-mode">
      <div className="write-topbar">
        <button className="write-back-btn" onClick={backToList}>← Dashboard</button>

        <div className="write-topbar-right">
          {message && (
            <span className={`write-inline-msg ${message.type}`}>{message.text}</span>
          )}

          <label className="publish-toggle">
            <input
              type="checkbox"
              checked={form.is_published}
              onChange={(e) => setForm((f) => ({ ...f, is_published: e.target.checked }))}
            />
            <span className="toggle-label">{form.is_published ? "Published" : "Draft"}</span>
          </label>

          <select
            className="category-select"
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <button
            className="write-save-btn"
            onClick={handleSubmit}
            disabled={submitting || !form.title.trim() || !form.content.trim()}
          >
            {submitting ? "Saving..." : editingPost ? "Update" : "Save"}
          </button>
        </div>
      </div>

      <form className="write-body" onSubmit={handleSubmit}>
        <input
          className="write-title-input"
          placeholder="Post title..."
          value={form.title}
          maxLength={255}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
        />
        <div className="write-divider" />
        <textarea
          className="write-content-input"
          placeholder="Write your thoughts here..."
          value={form.content}
          onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
        />
      </form>
    </div>
  );
}
