import NavBar from "../../components/NavBar/NavBar";
import FeaturedBanner from "../../components/FeaturedBanner/FeaturedBanner";
import ContentRow from "../../components/ContentRow/ContentRow";
import { usePosts } from "../../hooks/usePosts";
import "./ReaderHome.css";

function ReaderHome() {
  const { posts: apiPosts, loading } = usePosts();

  if (loading) {
    return (
      <div className="reader-loading">
        <NavBar />
        <div className="reader-loading-content">
          <div className="reader-spinner" />
        </div>
      </div>
    );
  }

  const posts = apiPosts;

  const technology  = posts.filter((p) => p.category === "Technology");
  const philosophy  = posts.filter((p) => p.category === "Philosophy");
  const research    = posts.filter((p) => p.category === "Research");
  const personal    = posts.filter((p) => p.category === "Personal");
  const concepts    = posts.filter((p) => p.category === "Concepts");
  const simulations = posts.filter((p) => p.category === "Fake Simulations");
  const lifeExp     = posts.filter((p) => p.category === "Life Experiments");
  const caseStudies = posts.filter((p) => p.category === "Case Studies");

  return (
    <>
      <NavBar />
      <FeaturedBanner />

      {posts.length > 0 && (
        <ContentRow title="Recently Published" posts={posts} />
      )}

      {technology.length > 0 && (
        <section id="technology">
          <ContentRow title="Technology" posts={technology} />
        </section>
      )}

      {philosophy.length > 0 && (
        <section id="philosophy">
          <ContentRow title="Philosophy" posts={philosophy} />
        </section>
      )}

      {research.length > 0 && (
        <section id="research">
          <ContentRow title="Research" posts={research} />
        </section>
      )}

      {personal.length > 0 && (
        <section id="personal">
          <ContentRow title="Personal" posts={personal} />
        </section>
      )}

      {concepts.length > 0 && (
        <section id="concepts">
          <ContentRow title="Concepts" posts={concepts} />
        </section>
      )}

      {simulations.length > 0 && (
        <section id="fake-simulations">
          <ContentRow title="Fake Simulations" posts={simulations} />
        </section>
      )}

      {lifeExp.length > 0 && (
        <section id="life-experiments">
          <ContentRow title="Life Experiments" posts={lifeExp} />
        </section>
      )}

      {caseStudies.length > 0 && (
        <section id="case-studies">
          <ContentRow title="Case Studies" posts={caseStudies} />
        </section>
      )}

      {posts.length === 0 && !loading && (
        <div className="reader-empty">
          <p>No posts published yet.</p>
        </div>
      )}
    </>
  );
}

export default ReaderHome;
