'use client'
import { useState } from "react";
import PostItem from "./PostItem";

export default function PostsGrid({ posts = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 16;

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = posts.slice(indexOfFirstArticle, indexOfLastArticle);

  const totalPages = Math.ceil(posts.length / articlesPerPage);

  return (
    <div className="lg:px-32 md:px-20 sm:px-8">
      <ul className="lg:grid lg:grid-cols-4 md:grid md:grid-cols-2">
        {currentArticles.map((post) => (
          <li key={post.id}>
            <PostItem {...post} />
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 mx-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
