import Image from "next/image";
import Link from "next/link";

export default function PostItem({
  slug,
  title,
  imageUrl,
  summary,
  creator_name,
  category,
  date,
}) {
  const formattedDate = new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="font-pretendard tracking-tighter px-3 py-6">
      <div>
        <header>
          <div className="flex justify-center items-center">
            <div className="relative w-full h-96">
              <Link href={`/category/${category}/${slug}`}>
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover rounded-3xl"
                  sizes="(max-width: 1400px) 100vw, 1400px"
                  srcSet={`${imageUrl} 1400w, ${imageUrl.replace(
                    ".jpg",
                    "-768x768.jpg"
                  )} 768w`}
                />
              </Link>
              <div className="absolute bottom-0 left-0 text-white p-2 font-pretendard font-semibold tracking-tighter uppercase text-sm">
                {category}
              </div>
            </div>
          </div>
          <div className="mt-2 flex flex-col">
            <Link href={`/category/${category}/${slug}`}>
              <h2 className="text-3xl tracking-tighter font-bold">{title}</h2>
            </Link>

            <div className="mt-1">
              <p className="max-w-80">{summary}</p>
            </div>
            <div className="flex flex-row justify-between mt-2">
              <p>{formattedDate}</p>
              <p>{creator_name}</p>
            </div>
          </div>
        </header>
      </div>
    </article>
  );
}
