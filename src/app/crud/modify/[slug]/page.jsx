"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchPost, updatePost } from "@/lib/posts";
import { useState, useEffect } from "react";

export default function EditPostPage() {
  const router = useRouter();
  const { slug } = useParams(); // slug 가져오기

  // useQuery를 객체로 전달
  const { data: post, isLoading: isPostLoading } = useQuery({
    queryKey: ["post", slug], // slug를 사용하여 쿼리 키 설정
    queryFn: () => fetchPost(slug), // slug를 인자로 전달
    enabled: !!slug, // slug가 있을 때만 쿼리 실행
  });

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post?.title || ""); // 배열의 첫 번째 요소에서 제목 가져오기
      setSummary(post?.summary || ""); // 배열의 첫 번째 요소에서 내용 가져오기
    }
  }, [post]);

  const mutation = useMutation({
    mutationFn: (updatedPost) => updatePost(slug, updatedPost), // slug 사용
    onSuccess: () => {
      alert("포스트가 수정되었습니다.");
      router.push("/crud/modify"); // 수정 후 목록으로 돌아감
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Updating post with:", { title, summary }); // 로그 추가
      await mutation.mutateAsync({ title, summary }); // 수정 작업 수행
    } catch (error) {
      console.error("수정 중 오류 발생:", error); // 오류 로그 출력
      alert("수정 중 오류가 발생했습니다."); // 사용자에게 오류 알림
    }
  };

  if (isPostLoading || !slug) return <p>로딩 중...</p>;

  return (
    <form onSubmit={handleSubmit} className="pt-32">
      <div>
        <label htmlFor="title">
          제목
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="summary">내용</label>
        <textarea
          id="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </div>
      <button type="submit">수정 완료</button>
    </form>
  );
}
