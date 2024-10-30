"use client";

import { useRef } from "react";
import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";

export default function BodyLong({ backgroundColor, posts }) {
  const divRef = useRef();

  // 2개의 1x2 div 생성
  const divs = new Array(2).fill(null);

  return (
    <div
      ref={divRef}
      className={clsx(
        "md:h-[180vh] h-[200vh] flex flex-col justify-start items-center p-4 text-[#000000]",
        backgroundColor
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full md:px-20 mt-32">
        {divs.map((_, divIndex) => (
          <div
            key={divIndex}
            className={clsx(
              "grid grid-cols-1 gap-4 w-full",
              divIndex === 1 && "mt-16"
            )}
          >
            {posts.slice(divIndex * 2, divIndex * 2 + 2).map((post) => (
              <div key={post.id} className="mb-4">
                <div className="relative md:w-full md:h-[550px] h-60 w-60 sm:w-full">
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
                    <p className="max-w-80">{post.summary}</p>
                    <p>{post.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
