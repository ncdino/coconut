import {
  fetchPosts,
  addPost,
  updatePost,
  deletePost,
  fetchPost,
} from "@/lib/posts";

// 포스트 데이터를 가져오는 액션 크리에이터
export const fetchPostsRequest = () => ({
  type: "FETCH_POSTS_REQUEST",
});

export const fetchPostsSuccess = (posts) => ({
  type: "FETCH_POSTS_SUCCESS",
  payload: posts,
});

export const fetchPostsFailure = (error) => ({
  type: "FETCH_POSTS_FAILURE",
  payload: error,
});

export const fetchPostsData = (category) => async (dispatch) => {
  dispatch(fetchPostsRequest());
  try {
    const posts = await fetchPosts(category);
    dispatch(fetchPostsSuccess(posts));
  } catch (error) {
    dispatch(fetchPostsFailure(error.message));
  }
};

// 포스트를 가져오는 액션 크리에이터
export const fetchPostRequest = () => ({
  type: "FETCH_POST_REQUEST",
});

export const fetchPostSuccess = (post) => ({
  type: "FETCH_POST_SUCCESS",
  payload: post,
});

export const fetchPostFailure = (error) => ({
  type: "FETCH_POST_FAILURE",
  payload: error,
});

export const fetchPostData = (slug) => async (dispatch) => {
  dispatch(fetchPostRequest());
  try {
    const post = await fetchPost(slug);
    dispatch(fetchPostSuccess(post)); // 첫 번째 포스트를 가져옴
  } catch (error) {
    dispatch(fetchPostFailure(error.message));
  }
};

// 포스트를 추가하는 액션 크리에이터
export const createPostRequest = () => ({
  type: "CREATE_POST_REQUEST",
});

export const createPostSuccess = (post) => ({
  type: "CREATE_POST_SUCCESS",
  payload: post,
});

export const createPostFailure = (error) => ({
  type: "CREATE_POST_FAILURE",
  payload: error,
});

export const createPost = (newPost) => async (dispatch) => {
  dispatch(createPostRequest());
  try {
    const post = await addPost(newPost);
    dispatch(createPostSuccess(post));
  } catch (error) {
    dispatch(createPostFailure(error.message));
  }
};

// 포스트를 업데이트하는 액션 크리에이터
export const updatePostRequest = () => ({
  type: "UPDATE_POST_REQUEST",
});

export const updatePostSuccess = (post) => ({
  type: "UPDATE_POST_SUCCESS",
  payload: post,
});

export const updatePostFailure = (error) => ({
  type: "UPDATE_POST_FAILURE",
  payload: error,
});

export const updatePostData = (slug, updatedPost) => async (dispatch) => {
  dispatch(updatePostRequest());
  try {
    await updatePost(slug, updatedPost);
    dispatch(updatePostSuccess(updatedPost));
  } catch (error) {
    dispatch(updatePostFailure(error.message));
  }
};

// 포스트를 삭제하는 액션 크리에이터
export const deletePostRequest = () => ({
  type: "DELETE_POST_REQUEST",
});

export const deletePostSuccess = (id) => ({
  type: "DELETE_POST_SUCCESS",
  payload: id,
});

export const deletePostFailure = (error) => ({
  type: "DELETE_POST_FAILURE",
  payload: error,
});

export const deletePostData = (id) => async (dispatch) => {
  dispatch(deletePostRequest());
  try {
    await deletePost(id);
    dispatch(deletePostSuccess(id));
  } catch (error) {
    dispatch(deletePostFailure(error.message));
  }
};

// 폼 필드 업데이트 액션 크리에이터
export const setFormField = (field, value) => ({
  type: "SET_FORM_FIELD",
  payload: { field, value },
});

export const resetForm = () => ({
  type: "RESET_FORM",
});
