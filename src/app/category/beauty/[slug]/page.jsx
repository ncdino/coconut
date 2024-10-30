"use client";

import { useState, useEffect } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchPost } from "@/lib/posts";
import Contents from "@/components/Contents";

export default function BeautyDetailsPage({ params }) {
  const { slug } = params;

  // 스크롤 위치에 따라 투명도 및 스케일 조절
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const headerOpacity = useTransform(scrollY, [0, 900], [1, 0]);
  const ss1Opacity = useTransform(scrollY, [0, 1300], [1, 0.3]);
  const headerScale = useTransform(scrollY, [0, 900], [1, 1.5]);

  // 스크롤 위치에 따라 배경색 조절
  const [color, setColor] = useState("rgba(255, 255, 255, 0)");
  const headerBackgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", color]
  );

  // TanStack Query v5: useQuery를 객체 형식으로 호출
  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  useEffect(() => {
    if (post && post[0].color) {
      setColor(post[0].color);
    }
  }, [post]);

  if (error) {
    console.error("Error fetching post:", error);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 배열에서 첫 번째 포스트만 받아오기
  const { imageUrl, category, title, summary, content, date, creator_name } =
    post[0];

  return (
    <div className="flex flex-col font-pretendard tracking-tighter">
      {/* 상단 스크롤 프로그레스 바 */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2.5 z-50 cursor-none"
        style={{ scaleX, backgroundColor: color }}
      />

      <motion.header id="소개" className="flex lg:flex-row flex-col mb-4">
        {/* 왼쪽 div: img 요소 사용 */}
        <motion.div
          id="leftDiv"
          className="lg:w-1/2 lg:sticky top-0 h-screen flex flex-col justify-end overflow-hidden"
          style={{
            backgroundColor: headerBackgroundColor,
          }}
        >
          <motion.img
            src={imageUrl}
            alt={title}
            style={{
              scale: headerScale,
              opacity: headerOpacity,
            }}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div
          id="rightDiv"
          className="lg:w-1/2 text-white"
          style={{ backgroundColor: color }}
        >
          <motion.div
            className="sticky top-1/2 transform -translate-y-1/2 px-16 sm:mt-48"
            style={{ opacity: ss1Opacity }}
          >
            <span className="text-xl uppercase font-bold">{category}</span>
            <h1
              className="lg:text-8xl md:text-7xl sm:text-5xl font-bold tracking-tight underline underline-offset-8 mt-3"
              style={{ wordBreak: "keep-all" }}
            >
              {title}
            </h1>
            <p className="pt-4 lg:text-2xl sm:text-xl max-w-full font-bold">
              {summary}
            </p>
            <p className="pt-8 lg:text-xl font-bold">{date}</p>
            <div className="flex justify-end mt-10 text-xl font-bold">{creator_name}</div>
          </motion.div>
        </div>
      </motion.header>
      <main className="mt-4 sm:px-6">
        <Contents content={content} />
      </main>
    </div>
  );
}
