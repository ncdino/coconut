"use client";

import PostsGrid from "@/components/Body/PostsGrid";
// import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
// import Image from "next/image";

export default function CulturesPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "cultures_posts"));
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  if (posts) {
    console.log("posts OK");
  }
  return (
    <div className="font-pretendard">
      <header className="py-16 sm:pt-64">
        <div className="justify-center text-center">
          <h1 className="text-8xl font-bold tracking-tighter">CULTURES</h1>
        </div>
      </header>
      <main>
        <div id="1">
          <PostsGrid posts={posts} />
        </div>
      </main>
    </div>
  );
}
