"use client";
import { useEffect, useState } from "react";
import { getPost } from "@/lib/posts";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CulturesDetailsPage({ params }) {
  const [post, setPost] = useState(null);
  const router = useRouter();
  const { slug } = params;

  useEffect(() => {
    const fetchPost = async () => {
      if (slug) {
        const fetchedPost = await getPost(slug);
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          router.replace("/404");
        }
      }
    };

    fetchPost();
  }, [slug]);

  const escapeHtml = (unsafe) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "#039;");
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  // post.content가 있는지 확인한 후 처리
  const escapedContent = post.content
    ? escapeHtml(post.content).replace(/\n/g, "<br />")
    : "";

  return (
    <div>
      <header>
        <div>
          <Image src={post.imageUrl} alt={post.title} layout="fill" />
        </div>
        <div>
          <h1>{post.title}</h1>
          <p>
            by <a href={`mailto:${post.creator_email}`}>{post.creator}</a>
          </p>
          <p>{post.summary}</p>
        </div>
      </header>
      <main>
        {/* escapedContent를 dangerouslySetInnerHTML로 사용 */}
        <p dangerouslySetInnerHTML={{ __html: escapedContent }}></p>
        <p>{slug}</p>
      </main>
    </div>
  );
}
