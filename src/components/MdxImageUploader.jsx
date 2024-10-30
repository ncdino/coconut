import { useState } from "react";
import { uploadImageToStorage } from "@/lib/posts";
import Image from "next/image";

export default function MdxImageUploader({ onUpload }) {
  const [image, setImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await uploadImageToStorage(file); // Firebase에 이미지 업로드
        onUpload(imageUrl); // 부모 컴포넌트로 이미지 URL 전달
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
      }
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && (
        <Image src={image} alt="Uploaded MDX Image" width={100} height={100} />
      )}
    </div>
  );
}
