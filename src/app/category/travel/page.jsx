"use client";

import { useQuery } from "@tanstack/react-query";
import PostsGrid from "@/components/Body/PostsGrid";
import { fetchPosts } from "@/lib/posts";

export default function travelPage() {
  const category = "travel";

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts", category],
    queryFn: () => fetchPosts(category),
    staleTime: 3600000,
    cacheTime: 86400000,
  });

  let content;
  if (isLoading) {
    content = <p>isLoading</p>;
  }

  if (isError) {
    content = (
      <p>is error : {error.info?.message || "데이터를 가져오지 못했습니다."}</p>
    );
  }

  return (
    <div className="font-pretendard">
      <header className="py-16 sm:pt-64">
        <div className="justify-center text-center">
          <h1 className="text-8xl font-bold tracking-tighter uppercase">{category}</h1>
        </div>
      </header>
      <main>
        <div id="1">
          {posts ? <PostsGrid posts={posts} /> : <p>포스트가 없습니다 </p>}
        </div>
      </main>
    </div>
  );
}
