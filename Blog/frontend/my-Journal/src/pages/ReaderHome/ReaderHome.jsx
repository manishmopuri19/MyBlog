import NavBar from "../../components/NavBar/NavBar";

import FeaturedBanner from "../../components/FeaturedBanner/FeaturedBanner";
import ContentRow from "../../components/ContentRow/ContentRow";

import { mockPosts } from "../../data/mockPosts";
import "./ReaderHome.css"
import { usePosts } from "../../hooks/usePosts";
function ReaderHome() {

  const {posts,loading}=usePosts();
  if(loading){
    return(
      <h1>
        Loading...
      </h1>
    )
  }
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


      <section id="thoughts">
      <ContentRow
        title="Thoughts"
        posts={thoughts}
      />
</section>

      <section id="tech">
      <ContentRow
        title="Tech"
        posts={tech}
      />
      </section>

      <section id="research">
      <ContentRow
        title="Research"
        posts={research}
      />
      </section>

      <section id="philosophy">
      <ContentRow
        title="Philosophy"
        posts={philosophy}
      />
      </section>

      <section id="simulations">
      <ContentRow
        title="Simulations"
        posts={simulations}
      />
      </section>

    </>

  );

}

export default ReaderHome;