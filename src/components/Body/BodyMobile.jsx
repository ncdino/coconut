"use client";

import { useRef } from "react";
import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";

export default function BodyMobile({
  posts,
  currentPage,
  postsPerPage,
  paginate,
}) {
  const divRef = useRef();

  // 현재 페이지에 해당하는 포스트 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  }

  return (
    <div
      ref={divRef}
      className="flex flex-col justify-start items-center px-8 text-black bg-[#eefb54] "
    >
      <div className="grid grid-cols-1 gap-8 w-full mt-32">
        {currentPosts.map((post) => (
          <div key={post.id} className="mb-4">
            <div className="relative w-full h-60">
              <Link href={`/category/${post.category}/${post.slug}`}>
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1400px) 100vw, 1400px"
                  srcSet={`${post.imageUrl} 1400w, ${post.imageUrl.replace(
                    ".jpg",
                    "-768x768.jpg"
                  )} 768w`}
                />
              </Link>
              <div className="absolute bottom-0 left-0 text-white p-2 font-pretendard font-semibold tracking-tighter uppercase text-sm">
                {post.category}
              </div>
            </div>
            <div>
              <Link href={`/category/${post.category}/${post.slug}`}>
                <h2 className="text-3xl font-bold tracking-tighter mt-4">
                  {post.title}
                </h2>
              </Link>

              <div className="mt-1.5">
                <p className="tracking-tighter max-w-80">{post.summary}</p>
                <p className="font-light text-sm tracking-tighter">{formatDate(post.date)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
