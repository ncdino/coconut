import clsx from "clsx";
import Link from "next/link";

export default function BodyShort({ isTextDark, post }) {
  // const date = new Date(post.createdAt.seconds * 1000); // Firestore 타임스탬프를 Date 객체로 변환
  // const formattedDate = date.toLocaleDateString("ko-KR", {
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // });

  return (
    <div
      className="lg:sticky top-0 h-screen flex flex-col justify-end bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${post.imageUrl})`,
      }}
    >
      <div className="px-7 py-12">
        <div
          className={clsx(
            "flex flex-col tracking-tighter gap-2",
            isTextDark ? "text-white" : "text-black"
          )}
        >
          <span tag="example" className="font-semibold uppercase">
            {/* 카테고리 */}
            {post.category}
          </span>
          <Link href={`/category/${post.category}/${post.slug}`}>
            <h2 className="font-bold lg:text-5xl text-3xl max-w-full">
              {/* 제목 */}
              {post.title}
            </h2>
          </Link>

          <p className="text-xl font-semibold max-w-md text-gray-200">
            {/* 서브텍스트 */}
            {post.summary}
          </p>
        </div>
        <div className="flex flex-row justify-between text-white tracking-tight">
          <span>{post.date}</span>
          <p>
            {/* 작성자 */}
            {post.creator_name}
          </p>
        </div>
      </div>
    </div>
  );
}
