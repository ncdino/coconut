import { db } from "@/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  orderBy,
  startAfter,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// slug에 해당하는 포스트를 가져오는 함수
export const fetchPost = async (slug) => {
  const q = query(collection(db, "cultures_posts"), where("slug", "==", slug));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // 문서의 데이터를 가져오기 위해 각 문서에 대해 .data() 호출
    return querySnapshot.docs.map((doc) => doc.data());
  } else {
    return null;
  }
};

export const fetchPosts = async (category) => {
  let q;
  if (category === "all") {
    q = query(collection(db, "cultures_posts"));
  } else {
    q = query(
      collection(db, "cultures_posts"),
      where("category", "==", category)
    );
  }
  const querySnapshot = await getDocs(q);
  const postsData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return postsData;
};

// export const fetchPaginatedPosts = async (pageSize, lastVisibleDoc = null) => {
//   try {
//     const postsRef = collection(db, "cultures_posts");

//     let q;
//     if (lastVisibleDoc) {
//       q = query(
//         postsRef,
//         orderBy("createdAt", "desc"),
//         startAfter(lastVisibleDoc),
//         limit(pageSize)
//       );
//     } else {
//       q = query(postsRef, orderBy("createdAt", "desc"), limit(pageSize));
//     }

//     const querySnapshot = await getDocs(q);

//     const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

//     const posts = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     return { posts, lastVisible };
//   } catch (error) {
//     console.error("페이지네이션 중 오류 발생 :", error);
//     throw new Error("fetchPaginatedPosts 에러 발생");
//   }
// };

export const addPost = async (postData) => {
  try {
    const doc = await addDoc(collection(db, "cultures_posts"), postData);
    return doc.id;
  } catch (error) {
    console.log("addPost Error", error);
    throw new Error("글 전송 중 오류 발생");
  }
};


// post 업데이트 함수
export const updatePost = async (slug, updatedPost) => {
  const postRef = doc(db, "cultures_posts", slug); // 슬러그를 문서 ID로 사용
  await updateDoc(postRef, updatedPost);
};

export const deletePost = async (id) => {
  const postDocRef = doc(db, "cultures_posts", id); // ID로 문서 참조 생성
  await deleteDoc(postDocRef); // 문서 삭제
};

export const uploadImageToStorage = async (file) => {
  const storage = getStorage();
  const storageRef = ref(storage, `mdx-images/${file.name}`);
  console.log(file);

  try {
    const snapshot = await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("이미지 업로드 중 오류 발생 :", error);
    throw error;
  }
};
