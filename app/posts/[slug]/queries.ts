import fs from "fs";
import path from "path";
import matter from "gray-matter";

const rootDirectory = path.join(process.cwd(), "content", "posts");

export type Post = {
  metadata: PostMetadata;
  content: string;
};

export type PostMetadata = {
  title?: string;
  summary?: string;
  image?: string;
  author?: string;
  publishedAt?: string;
  slug: string;
};

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const filePath = path.join(rootDirectory, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });
    const { data, content } = matter(fileContent);
    return { metadata: { ...data, slug }, content };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getPosts(limit?: number): Promise<PostMetadata[]> {
  const files = fs.readdirSync(rootDirectory);

  const posts = files
    .map((file) => getPostMetadata(file))
    .filter((post) => post !== null) // Filter out null results
    .sort((a, b) => {
      const dateA = new Date(a.publishedAt ?? "");
      const dateB = new Date(b.publishedAt ?? "");

      if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
        return 0; // Skip invalid dates
      }

      return dateA < dateB ? 1 : -1; // Sort in descending order
    });

  if (limit) {
    return posts.slice(0, limit);
  }

  return posts;
}

export function getPostMetadata(filepath: string): PostMetadata | null {
  const slug = filepath.replace(/\.mdx$/, "");
  const filePath = path.join(rootDirectory, filepath);

  try {
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
    const { data } = matter(fileContent);

    // If required fields are missing, log the error and return null
    if (!data.title || !data.publishedAt) {
      console.warn(`Missing metadata in post: ${slug}`);
      return null; // Skip incomplete posts
    }

    // Return post metadata with defaults for missing values
    return {
      title: data.title || "Untitled Post",
      summary: data.summary || "No summary available.",
      image: data.image || "/images/default.jpg",
      author: data.author || "Unknown Author",
      publishedAt: data.publishedAt || "1970-01-01", // Default date for missing dates
      slug,
    };
  } catch (error) {
    console.error(`Error reading file ${filepath}:`, error);
    return null; // Skip file if error occurs
  }
}
