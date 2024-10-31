"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPost } from "@/lib/posts";
import { slugify } from "@/utils/slugify";
import ImageUploader from "@/components/ImageUploader";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import CustomSketchPicker from "@/components/CustomSketchPicker";
import MdxImageUploader from "@/components/MdxImageUploader";

import {
  setFormField,
  resetForm,
  createPostSuccess,
  createPostFailure,
} from "@/store/actions/postsActions";

export default function WritePage() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#ffffff"); // 색상 상태 추가
  const [selectedImage, setSelectedImage] = useState(null); // 이미지 상태 추가
  const [uploadStatus, setUploadStatus] = useState(""); // 업로드 상태 추가
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // 성공 메시지 상태 추가

  const form = useSelector((state) => state.posts.form) || {}; // form의 초기값을 빈 객체로 설정

  const mutation = useMutation({
    mutationFn: ({ postData, ImageFile }) => addPost(postData, ImageFile),
    onSuccess: (data) => {
      console.log("포스트 추가 성공:", data);
      dispatch(createPostSuccess(data));
      queryClient.invalidateQueries(["posts", form.category]);
      dispatch(resetForm());
      setContent(""); // MDX Content 초기화
      setShowSuccessMessage(true); // 성공 메시지 표시
      setTimeout(() => setShowSuccessMessage(false), 3000); // 3초 후 메시지 숨기기
    },
    onError: (error) => {
      console.error("포스트 추가 실패:", error);
      dispatch(createPostFailure(error.message));
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const slug = slugify(form.slugParam);
    const newPost = {
      ...form,
      slug,
      content, // MDX 형식의 글 내용
      color, // 선택된 색상 추가
    };
    console.log("새 포스트 데이터 : ", newPost);
    mutation.mutate({ postData: newPost, ImageFile: selectedImage }); // 포스트 데이터와 이미지 파일 전달
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormField(name, value));
  };

  const handleImageUpload = (value) => {
    dispatch(setFormField("imageUrl", value));
    setUploadStatus("업로드 완료"); // 업로드 완료 상태 설정
  };

  return (
    <div className="font-pretendard tracking-tighter">
      <main>
        <form onSubmit={handleSubmit} className="px-20 py-36">
          <div className="flex flex-col gap-1 tracking-tight text-xl">
            {/* Input Fields for Post Details */}
            <div className="set-test-border">
              <label htmlFor="title">제목</label>
              <input
                type="text"
                id="title"
                name="title"
                value={form.title || ""} // 초기값 확인
                onChange={handleChange}
                required
                className="input-test-border"
              />
            </div>

            <div className="set-test-border">
              <label htmlFor="creator_name">작성자 이름</label>
              <input
                type="text"
                id="creator_name"
                name="creator_name"
                value={form.creator_name || ""} // 초기값 확인
                onChange={handleChange}
                required
                className="input-test-border"
              />
            </div>

            <div className="set-test-border">
              <label htmlFor="creator_email">이메일</label>
              <input
                type="email"
                id="creator_email"
                name="creator_email"
                value={form.creator_email || ""} // 초기값 확인
                onChange={handleChange}
                required
                className="input-test-border"
              />
            </div>

            {/* Category Selection */}
            <div className="set-test-border">
              <label htmlFor="category">카테고리</label>
              <select
                id="category"
                name="category"
                value={form.category || ""} // 초기값 확인
                onChange={handleChange}
                required
                className="input-test-border"
              >
                <option value="">카테고리 선택</option>
                <option value="cultures">컬쳐</option>
                <option value="beauty">뷰티</option>
                <option value="travel">여행</option>
              </select>
            </div>

            {/* Title & Slug */}
            <div className="set-test-border">
              <label htmlFor="slugParam">slug</label>
              <input
                type="text"
                id="slugParam"
                name="slugParam"
                value={form.slugParam || ""} // 초기값 확인
                onChange={handleChange}
                required
                className="input-test-border"
              />
            </div>

            {/* Date */}
            <div className="set-test-border">
              <label htmlFor="date">날짜</label>
              <input
                type="date"
                id="date"
                name="date"
                value={form.date || ""} // 초기값 확인
                onChange={handleChange}
                required
                className="input-test-border"
              />
            </div>

            {/* Summary */}
            <div className="set-test-border w-full">
              <label htmlFor="summary">요약</label>
              <textarea
                id="summary"
                name="summary"
                value={form.summary || ""} // 초기값 확인
                onChange={handleChange}
                rows="3"
                className="input-test-border w-full"
                placeholder="글 요약을 입력하세요."
              />
            </div>

            {/* MDX Content */}
            <div>
              <label htmlFor="content">내용</label>
              <textarea
                id="content"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="20"
                className="input-test-border w-full"
                placeholder="MDX로 글을 작성하세요."
              />
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image">Thumbnail 이미지</label>
              <ImageUploader onUpload={handleImageUpload} />
              {uploadStatus && <p>{uploadStatus}</p>} {/* 업로드 상태 표시 */}
            </div>

            <div>
              <label htmlFor="mdxImage">MDX 이미지</label>
              <MdxImageUploader
                onUpload={(mdxImageUrl) =>
                  setContent(
                    (prevContent) =>
                      `${prevContent}\n!alt text`
                  )
                }
              />
            </div>

            {/* Color Picker */}
            <div>
              <label htmlFor="color">색상 선택</label>
              <CustomSketchPicker
                color={color}
                onChangeComplete={(color) => setColor(color.hex)}
              />
            </div>
            {/* Submit Button */}
            <div className="flex justify-center items-center">
              <button type="submit" className="input-test-border">
                글 작성
              </button>
              <div>
                <MarkdownRenderer />
              </div>
            </div>
          </div>
        </form>
        {showSuccessMessage && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-lg">
              <p>글 작성이 성공적으로 완료되었습니다!</p>
              <button onClick={() => setShowSuccessMessage(false)}>닫기</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
