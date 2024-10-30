// const initialState = {
//     posts: [],
//     post: null,
//     loading: false,
//     error: null,
//     form: {
//       creator_name: '',
//       creator_email: '',
//       title: '',
//       summary: '',
//       content: '',
//       imageUrl: '',
//       slugParam: '',
//       category: '',
//       date: '',
//     },
//   };

//   const postsReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'FETCH_POST_REQUEST':
//         return { ...state, loading: true, error: null };
//       case 'FETCH_POST_SUCCESS':
//         return { ...state, loading: false, post: action.payload };
//       case 'FETCH_POST_FAILURE':
//         return { ...state, loading: false, error: action.payload };
//       case 'FETCH_POSTS_REQUEST':
//         return { ...state, loading: true, error: null };
//       case 'FETCH_POSTS_SUCCESS':
//         return { ...state, loading: false, posts: action.payload };
//       case 'FETCH_POSTS_FAILURE':
//         return { ...state, loading: false, error: action.payload };
//       case 'CREATE_POST_REQUEST':
//         return { ...state, loading: true, error: null };
//       case 'CREATE_POST_SUCCESS':
//         return { ...state, loading: false, posts: [...state.posts, action.payload] };
//       case 'CREATE_POST_FAILURE':
//         return { ...state, loading: false, error: action.payload };
//       case 'UPDATE_POST_REQUEST':
//         return { ...state, loading: true, error: null };
//       case 'UPDATE_POST_SUCCESS':
//         return {
//           ...state,
//           loading: false,
//           posts: state.posts.map((post) =>
//             post.id === action.payload.id ? action.payload : post
//           ),
//         };
//       case 'UPDATE_POST_FAILURE':
//         return { ...state, loading: false, error: action.payload };
//       case 'DELETE_POST_REQUEST':
//         return { ...state, loading: true, error: null };
//       case 'DELETE_POST_SUCCESS':
//         return {
//           ...state,
//           loading: false,
//           posts: state.posts.filter((post) => post.id !== action.payload),
//         };
//       case 'DELETE_POST_FAILURE':
//         return { ...state, loading: false, error: action.payload };
//       case 'SET_FORM_FIELD':
//         return {
//           ...state,
//           form: {
//             ...state.form,
//             [action.payload.field]: action.payload.value,
//           },
//         };
//       case 'RESET_FORM':
//         return {
//           ...state,
//           form: initialState.form,
//         };
//       default:
//         return state;
//     }
//   };

//   export default postsReducer;



// initialState 정의
const initialState = {
  posts: [],
  post: null,
  loading: false,
  error: null,
  form: {
    creator_name: "",
    creator_email: "",
    title: "",
    summary: "",
    content: "",
    imageUrl: "",
    slugParam: "",
    category: "",
    date: "",
  },
};

// 공통 함수 정의
const handleRequest = (state) => ({
  ...state,
  loading: true,
  error: null,
});

const handleFailure = (state, action) => ({
  ...state,
  loading: false,
  error: action.payload,
});

// 리듀서
const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_POST_REQUEST":
    case "FETCH_POSTS_REQUEST":
    case "CREATE_POST_REQUEST":
    case "UPDATE_POST_REQUEST":
    case "DELETE_POST_REQUEST":
      return handleRequest(state); // 공통 로직 호출

    case "FETCH_POST_SUCCESS":
      return { ...state, loading: false, post: action.payload };

    case "FETCH_POSTS_SUCCESS":
      return { ...state, loading: false, posts: action.payload };

    case "CREATE_POST_SUCCESS":
      return {
        ...state,
        loading: false,
        posts: [...state.posts, action.payload],
      };

    case "UPDATE_POST_SUCCESS":
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
      };

    case "DELETE_POST_SUCCESS":
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };

    case "FETCH_POST_FAILURE":
    case "FETCH_POSTS_FAILURE":
    case "CREATE_POST_FAILURE":
    case "UPDATE_POST_FAILURE":
    case "DELETE_POST_FAILURE":
      return handleFailure(state, action); // 공통 로직 호출

    case "SET_FORM_FIELD":
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.field]: action.payload.value,
        },
      };

    case "RESET_FORM":
      return {
        ...state,
        form: initialState.form,
      };

    default:
      return state;
  }
};

export default postsReducer;
