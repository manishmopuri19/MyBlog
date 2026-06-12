import NavBar from "../../components/NavBar/NavBar";

import FeaturedBanner from "../../components/FeaturedBanner/FeaturedBanner";
import ContentRow from "../../components/ContentRow/ContentRow";

import { mockPosts } from "../../data/mockPosts";

function ReaderHome() {

  const thoughts =
    mockPosts.filter(
      post => post.category === "Thoughts"
    );

  const tech =
    mockPosts.filter(
      post => post.category === "Tech"
    );

  const research =
    mockPosts.filter(
      post => post.category === "Research"
    );

  const philosophy =
    mockPosts.filter(
      post => post.category === "Philosophy"
    );

  const simulations =
    mockPosts.filter(
      post => post.category === "Simulations"
    );

  return (

    <>
      <NavBar />

      <FeaturedBanner />

      <ContentRow
        title="Recently Published"
        posts={mockPosts}
      />

      <ContentRow
        title="Thoughts"
        posts={thoughts}
      />

      <ContentRow
        title="Tech"
        posts={tech}
      />

      <ContentRow
        title="Research"
        posts={research}
      />

      <ContentRow
        title="Philosophy"
        posts={philosophy}
      />

      <ContentRow
        title="Simulations"
        posts={simulations}
      />

    </>

  );

}

export default ReaderHome;