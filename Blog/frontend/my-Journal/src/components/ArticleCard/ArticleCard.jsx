import { useNavigate } from "react-router-dom";
import "./ArticleCard.css";

const CATEGORY_IMAGES = {
  personal:
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80",
  technology:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
  philosophy:
    "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=600&q=80",
  concepts:
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80",
  "fake simulations":
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
  research:
    "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=600&q=80",
  "life experiments":
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80",
  "case studies":
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
};

function ArticleCard({ post }) {
  const navigate = useNavigate();
  const categoryKey = post.category?.toLowerCase();
  const imgUrl = CATEGORY_IMAGES[categoryKey];
  const isConfession = categoryKey === "confession";

  return (
    <div
      className="article-card"
      onClick={() => navigate(`/posts/${post.slug}`)}
    >
      <div className={`card-image${isConfession ? " card-image--confession" : ""}`}>
        {imgUrl && !isConfession && (
          <img src={imgUrl} alt={post.category} className="card-img" />
        )}
        {isConfession && (
          <>
            <div className="confession-petal confession-petal-1" />
            <div className="confession-petal confession-petal-2" />
            <div className="confession-glow" />
          </>
        )}
        <span className="card-category-badge">{post.category}</span>
      </div>

      <div className="card-body">
        <h3>{post.title}</h3>
        <p>{post.description || post.excerpt || ""}</p>
        <small>{post.readTime || "5 min read"}</small>
      </div>
    </div>
  );
}

export default ArticleCard;
