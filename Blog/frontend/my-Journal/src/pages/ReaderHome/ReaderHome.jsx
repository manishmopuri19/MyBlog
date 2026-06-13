import NavBar from "../../components/NavBar/NavBar";
import FeaturedBanner from "../../components/FeaturedBanner/FeaturedBanner";
import ContentRow from "../../components/ContentRow/ContentRow";
import { mockPosts } from "../../data/mockPosts";
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

  // Use real API posts when available, fall back to mock during development
  const posts = apiPosts.length > 0 ? apiPosts : mockPosts;

  const technology  = posts.filter((p) => p.category === "Technology");
  const philosophy  = posts.filter((p) => p.category === "Philosophy");
  const research    = posts.filter((p) => p.category === "Research");
  const personal    = posts.filter((p) => p.category === "Personal");

  return (
    <>
      <NavBar />
      <FeaturedBanner />

      <ContentRow title="Recently Published" posts={posts} />

      <section id="technology">
        <ContentRow title="Technology" posts={technology} />
      </section>

      <section id="philosophy">
        <ContentRow title="Philosophy" posts={philosophy} />
      </section>

      <section id="research">
        <ContentRow title="Research" posts={research} />
      </section>

      <section id="personal">
        <ContentRow title="Personal" posts={personal} />
      </section>
    </>
  );
}

export default ReaderHome;
