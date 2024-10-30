"use client";

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import PostsGrid from '@/components/Body/PostsGrid';
import { fetchPostsSuccess } from '@/store/actions/postsActions';
import { fetchPosts } from '@/lib/posts';

export default function BeautyPage() {
  const category = "beauty";
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  const { data: queryPosts, isLoading, isError, error: queryError } = useQuery({
    queryKey: ["posts", category],
    queryFn: () => fetchPosts(category),
    staleTime: 3600000,
    cacheTime: 86400000,
  });

  useEffect(() => {
    if (queryPosts) {
      dispatch(fetchPostsSuccess(queryPosts));
    }
  }, [dispatch, queryPosts]);

  let content;
  if (loading || isLoading) {
    content = <p>isLoading</p>;
  }

  if (error || isError) {
    content = (
      <p>is error : {error || queryError || "데이터를 가져오지 못했습니다."}</p>
    );
  }

  return (
    <div className="font-pretendard">
      <header className="py-16 sm:pt-64">
        <div className="justify-center text-center">
          <h1 className="text-8xl font-bold tracking-tighter">BEAUTY</h1>
        </div>
      </header>
      <main>
        <div id="1">
          {posts.length > 0 ? <PostsGrid posts={posts} /> : <p>포스트가 없습니다 </p>}
        </div>
      </main>
    </div>
  );
}
