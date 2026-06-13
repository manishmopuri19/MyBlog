import { useState, useEffect } from "react";
import { getPost } from "../services/postService";
import { mockPosts } from "../data/mockPosts";

export function usePost(slug) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchPost() {
      try {
        const data = await getPost(slug);
        setPost(data);
      } catch (err) {
        // Fall back to mock data when API is unavailable
        const mock = mockPosts.find((p) => p.slug === slug);
        if (mock) {
          setPost(mock);
        } else {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  return { post, loading, error };
}
