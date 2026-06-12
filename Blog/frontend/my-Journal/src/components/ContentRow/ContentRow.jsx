import ArticleCard from "../ArticleCard/ArticleCard";

import "./ContentRow.css";

function ContentRow({
  title,
  posts
}) {

  return (

    <section className="content-row">

      <h2>
        {title}
      </h2>

      <div className="row-scroll">

        {posts.map(post => (

          <ArticleCard
            key={post.id}
            post={post}
          />

        ))}

      </div>

    </section>

  );

}

export default ContentRow;