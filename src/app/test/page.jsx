"use client";
// pages/posts.js
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchPosts } from "@/lib/posts";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      const postsData = await fetchPosts(); // 비동기 호출
      setPosts(postsData);
    };

    fetchAllPosts(); // 함수 호출
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      {posts.map((post) => (
        <div key={post.id} className="mb-4 p-4 border rounded">
          <h2 className="text-xl font-semibold">
            <Link href={`/posts/${post.slug}`}>
              <p>{post.title}</p>
            </Link>
          </h2>
          <p className="text-gray-700">{post.summary}</p>
          {post.imageUrl && (
            <Image src={post.imageUrl} alt={post.title} className="mt-2" />
          )}
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="mt-2"
          ></div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
