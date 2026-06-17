import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  getAllPostsAdmin, createPost, updatePost,
  deletePost, publishPost, unpublishPost,
} from "../../services/postService";
import "./AdminWrite.css";

const CATEGORIES = [
  "Personal", "Technology", "Philosophy", "Concepts",
  "Fake Simulations", "Research", "Life Experiments", "Case Studies",
];

const CAT_CLASS = {
  "Personal":         "cat-personal",
  "Technology":       "cat-technology",
  "Philosophy":       "cat-philosophy",
  "Concepts":         "cat-concepts",
  "Fake Simulations": "cat-simulations",
  "Research":         "cat-research",
  "Life Experiments": "cat-life",
  "Case Studies":     "cat-cases",
};

const EMPTY_FORM = { title: "", description: "", content: "", category: "Personal", is_published: false };

const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

const wordCount = (t) => (t.trim() ? t.trim().split(/\s+/).length : 0);

export default function AdminWrite() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [view, setView] = useState("list");
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

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
      description: post.description || "",
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
      setMessage({
        type: "error",
        text: err.response?.data?.detail || "Something went wrong.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  async function confirmDelete(id) {
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      setMessage({ type: "error", text: "Delete failed." });
    } finally {
      setDeleteTarget(null);
    }
  }

  async function handleTogglePublish(post) {
    try {
      post.is_published ? await unpublishPost(post.id) : await publishPost(post.id);
      fetchPosts();
    } catch {
      setMessage({ type: "error", text: "Status update failed." });
    }
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const published = posts.filter((p) => p.is_published).length;
  const drafts = posts.length - published;

  // ── EDITOR (write / edit) ────────────────────────────────────
  if (view === "write" || view === "edit") {
    const words = wordCount(form.content);

    return (
      <div className="editor-page">
        <div className="editor-topbar">
          <button className="editor-back" onClick={backToList}>
            ← Dashboard
          </button>

          <span className="editor-heading">
            {view === "edit" ? "Edit Post" : "New Post"}
          </span>

          <div className="editor-controls">
            {message && (
              <span className={`editor-msg ${message.type}`}>{message.text}</span>
            )}

            <label className="pub-toggle" title="Toggle publish status">
              <input
                type="checkbox"
                checked={form.is_published}
                onChange={(e) => setForm((f) => ({ ...f, is_published: e.target.checked }))}
              />
              <span className={`pub-pill ${form.is_published ? "pub" : "draft"}`}>
                {form.is_published ? "Published" : "Draft"}
              </span>
            </label>

            <select
              className="editor-cat-select"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <button
              className="editor-save-btn"
              onClick={handleSubmit}
              disabled={submitting || !form.title.trim() || !form.content.trim()}
            >
              {submitting ? "Saving…" : view === "edit" ? "Update" : "Publish"}
            </button>
          </div>
        </div>

        <form className="editor-body" onSubmit={handleSubmit}>
          <input
            className="editor-title-input"
            placeholder="Post title…"
            value={form.title}
            maxLength={255}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            autoFocus
          />
          <textarea
            className="editor-description-input"
            placeholder="Short description — shown on cards and previews (max 500 chars)…"
            value={form.description}
            maxLength={500}
            rows={2}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          />
          <div className="editor-divider" />
          <textarea
            className="editor-content-input"
            placeholder="Write your thoughts here…"
            value={form.content}
            onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
          />
        </form>

        <div className="editor-footer">
          <span>{words} {words === 1 ? "word" : "words"}</span>
          <span className="footer-dot">·</span>
          <span>{form.content.length} chars</span>
        </div>
      </div>
    );
  }

  // ── DASHBOARD (list) ─────────────────────────────────────────
  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          MA< span className="logo-g">G</span>
          <span className="admin-badge">Admin</span>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-nav-item active">
            <span className="nav-icon">⊞</span>
            Dashboard
          </div>
          <button className="sidebar-nav-item" onClick={startNew}>
            <span className="nav-icon">＋</span>
            New Post
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="user-avatar">
              {user?.role?.[0] ?? "A"}
            </div>
            <div className="user-info">
              <span className="user-role">{user?.role ?? "Admin"}</span>
              <span className="user-id">ID · {user?.id}</span>
            </div>
          </div>
          <button className="sidebar-logout" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-main">

        {/* Header */}
        <div className="dash-header">
          <div>
            <h1 className="dash-title">Dashboard</h1>
            <p className="dash-sub">Manage your posts and content</p>
          </div>
          <button className="dash-new-btn" onClick={startNew}>
            + New Post
          </button>
        </div>

        {/* Message banner */}
        {message && (
          <div className={`dash-message ${message.type}`}>{message.text}</div>
        )}

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-value">{posts.length}</span>
            <span className="stat-label">Total Posts</span>
          </div>
          <div className="stat-card">
            <span className="stat-value stat-green">{published}</span>
            <span className="stat-label">Published</span>
          </div>
          <div className="stat-card">
            <span className="stat-value stat-muted">{drafts}</span>
            <span className="stat-label">Drafts</span>
          </div>
        </div>

        {/* Post list */}
        {loadingPosts ? (
          <div className="dash-loading">
            <div className="dash-spinner" />
          </div>
        ) : posts.length === 0 ? (
          <div className="dash-empty">
            <p className="dash-empty-glyph">✦</p>
            <p>No posts yet.</p>
            <button onClick={startNew}>Write your first post →</button>
          </div>
        ) : (
          <div className="posts-table-scroll">
            <div className="posts-table-head">
              <span>Title</span>
              <span>Category</span>
              <span>Date</span>
              <span>Status</span>
              <span>Actions</span>
            </div>
            <div className="posts-table">
              {posts.map((post) => (
                <div className="posts-row" key={post.id}>
                  <span className="pr-title">{post.title}</span>

                  <span className={`pr-cat ${CAT_CLASS[post.category] ?? ""}`}>
                    {post.category}
                  </span>

                  <span className="pr-date">{fmtDate(post.created_at)}</span>

                  <span className={`pr-status ${post.is_published ? "pub" : "draft"}`}>
                    {post.is_published ? "Published" : "Draft"}
                  </span>

                  <div className="pr-actions">
                    <button
                      className="pr-btn"
                      onClick={() => handleTogglePublish(post)}
                    >
                      {post.is_published ? "Unpublish" : "Publish"}
                    </button>
                    <button className="pr-btn" onClick={() => startEdit(post)}>
                      Edit
                    </button>
                    <button
                      className="pr-btn danger"
                      onClick={() => setDeleteTarget(post)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div className="modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Delete Post?</h3>
            <p className="modal-desc">
              "<strong>{deleteTarget.title}</strong>" will be permanently removed.
              This cannot be undone.
            </p>
            <div className="modal-actions">
              <button className="modal-cancel" onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
              <button
                className="modal-delete"
                onClick={() => confirmDelete(deleteTarget.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
