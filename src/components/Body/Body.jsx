"use client";
import Header from "../Header/MainHeader";
import BodyLong from "./Body-long";
import BodyShort from "./Body-short";
import BodyMobile from "./BodyMobile";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/lib/posts";

const splitPosts = (posts) => {
  const result = [];
  for (let i = 0; i < posts.length; i += 6) {
    result.push({
      short: posts[i],
      long: posts.slice(i + 1, i + 6),
    });
  }
  return result;
};

export default function Body() {
  const category = "all";

  const {
    data: queryPosts,
    isLoading,
    isError,
    error: queryError,
  } = useQuery({
    queryKey: ["posts", category],
    queryFn: () => fetchPosts(category),
    staleTime: 3600000,
    cacheTime: 86400000,
  });

  // 날짜로 정렬
  const sortedPosts = queryPosts ? [...queryPosts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  ) : [];

  const splitData = splitPosts(sortedPosts);

  // 화면 크기 상태
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  let postsPerPage = isMobile ? 8 : 3; // 한 페이지에 표시할 그룹 수

  // 페이지 변경 핸들러
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  let content;

  if (isLoading) {
    content = <p>로딩중...</p>;
  }

  if (isError) {
    content = <p>오류 발생: {queryError.message}</p>;
  }

  return (
    <div className="relative">
      <Header />
      <div className="font-pretendard flex flex-col">
        {content}
        {isMobile ? (
          <BodyMobile
            posts={sortedPosts}
            currentPage={currentPage}
            postsPerPage={postsPerPage}
            paginate={paginate}
          />
        ) : (
          splitData
            .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
            .map((group, index) => (
              <div
                key={index}
                className="flex flex-col lg:grid lg:grid-cols-2 h-[180vh]"
              >
                {index % 2 === 0 ? (
                  <>
                    <BodyShort isTextDark={true} post={group.short} />
                    <BodyLong
                      backgroundColor="bg-[#eefb54]"
                      posts={group.long}
                    />
                  </>
                ) : (
                  <>
                    <BodyLong
                      backgroundColor="bg-[#eefb54]"
                      posts={group.long}
                    />
                    <BodyShort isTextDark={true} post={group.short} />
                  </>
                )}
              </div>
            ))
        )}
        {/* 페이지네이션 */}
        <div className="flex justify-center bg-black pt-10">
          {Array.from(
            { length: Math.ceil(splitData.length / postsPerPage) },
            (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`font-pretendard font-bold text-4xl px-4 py-2 mx-1 ${
                  currentPage === i + 1 ? "text-[#FFA500]" : "text-white"
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
