import PostCard from "../PostCard/PostCard";
import "./LatestArticles.css";

function LatestArticles() {

  const posts = [
    {
      id: 1,
      title: "The Future Is A Hallucination",
      excerpt:
        "Exploring the nature of simulated realities.",
      category: "Research",
      readTime: "8 min"
    },
    {
      id: 2,
      title: "Why Humans Create Narratives",
      excerpt:
        "A deep dive into stories and meaning.",
      category: "Thoughts",
      readTime: "6 min"
    },
    {
      id: 3,
      title: "AI And Consciousness",
      excerpt:
        "Can intelligence emerge from patterns?",
      category: "Tech",
      readTime: "10 min"
    }
  ];

  return (
    <section className="latest-section">

      <h2>
        Latest Articles
      </h2>

      <div className="latest-grid">

        {posts.map(post => (

          <PostCard
            key={post.id}
            post={post}
          />

        ))}

      </div>

    </section>
  );
}

export default LatestArticles;