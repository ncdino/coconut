"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPosts, deletePost } from "@/lib/posts";

export default function PostsListPage() {
  const [category, setCategory] = useState("");
  const queryClient = useQueryClient();

  const {
    data: posts = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts", category],
    queryFn: () => fetchPosts(category),
    enabled: !!category, // category가 선택된 경우에만 쿼리 실행
    staleTime: 3600000,
    cacheTime: 86400000,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id), // id를 인자로 받도록 수정
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", category]); // 삭제 후 목록을 다시 가져옴
    },
    onError: (error) => {
      console.error("Error deleting document: ", error);
    },
  });

  const handleDelete = (id) => {
    console.log("Deleting post with ID:", id); // 삭제할 ID 확인
    deleteMutation.mutate(id); // post.id를 인자로 전달
  };

  return (
    <div className="font-pretendard">
      <div className="flex justify-center pt-36">
        <select
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">카테고리 선택하세요</option>
          <option value="cultures">컬쳐(Culture)</option>
          <option value="beauty">뷰티(Beauty)</option>
          <option value="travel">여행(Travel)</option>
        </select>
      </div>

      {isLoading && <p>로딩 중...</p>}
      {isError && <p>오류 발생: {error.message}</p>}

      <div className="flex justify-center text-xl gap-3">
        <ul>
          <br />
          {posts.map((post, index) => (
            <li key={post.id}>
              <div className="flex flex-row gap-6">
                <span className="text-2xl">{index + 1}.</span>
                <div className="flex flex-col gap-1">
                  <div className="text-2xl">
                    <h3>{post.title}</h3>
                  </div>
                  <div className="flex flex-row justify-between gap-3">
                    <Link href={`/crud/modify/${post.id}`}>
                      <button className="border border-black rounded-md px-4 text-black">
                        수정
                      </button>
                    </Link>
                    <button
                      className="rounded-md px-4 bg-red-800 text-white"
                      onClick={() => handleDelete(post.id)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
