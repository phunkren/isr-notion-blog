import { BlogPost } from "../types/notion";

// Filter unpublished articles from the results
export function filterPosts(posts: BlogPost[]) {
  const publishedPosts = posts.filter(
    (post) => post.properties.published.checkbox
  );

  return publishedPosts;
}

// Sort posts in chronological order (newest first)
export function sortPosts(posts: BlogPost[]) {
  return posts.sort((a, b) => {
    let dateA = new Date(a.properties.date.date.start).getTime();
    let dateB = new Date(b.properties.date.date.start).getTime();

    return dateB - dateA;
  });
}
