
function PostRow({title,posts}){

    return (
        <section className="post-row">
            <h2>
                {title}
            </h2>

            <div className="cards">
                {
                    posts.map(post=>
                        <PostCard
                        key={post.id}
                        post={post}
                        />
                    )
                }

            </div>
        </section>
    )
}