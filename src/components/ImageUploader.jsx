"use client";

import { useState } from "react";
import { storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid"; // uuid import

const ImageUploader = ({ onUpload }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]); // 배열에서 첫 번째 파일 선택
      console.log("Selected image:", e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault(); // 페이지 새로고침 방지

    if (image) {
      try {
        console.log("Uploading image:", image);

        // UUID 생성
        const uniqueFileName = `${uuidv4()}_${image.name}`;

        const storageRef = ref(storage, `images/${uniqueFileName}`);

        // 이미지 파일의 MIME 타입 설정 (PNG 형식이라 가정)
        const metadata = {
          contentType: image.type,
        };

        await uploadBytes(storageRef, image, metadata); // 메타데이터 추가
        console.log("Uploaded image to storage:", storageRef.fullPath);
        const url = await getDownloadURL(storageRef);
        console.log("Image URL:", url);
        onUpload(url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUploader;
