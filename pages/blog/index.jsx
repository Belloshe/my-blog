import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./blog.module.css";
import Heading from "@components/heading";

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/post");
      const data = await res.json();

      if (res.ok) {
        setPosts(data);
      } else {
        console.error("Error:", res.status, res.statusText);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <Heading>Blog</Heading>
      {posts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`} passHref>
          <div className={styles.link}>
            <div className="w-full flex flex-col">
              <p>{post.title}</p>
              <time className={styles.date}>{post.createdAt}</time>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
