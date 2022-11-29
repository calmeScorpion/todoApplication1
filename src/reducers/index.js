import { combineReducers } from 'redux';
const initialState = {
  data: [],
  loadingData: false,
  showForm: false,
  addPostLoading: false,
  onEditLoading: false,
  onDeleteLoading: false,
  selectedPostId: null,
  selectedPostDetails: null,
  successMessage: null,
};

const userData = {
  isSignedIn: false,
  googleId: null,
  mail: null,
};
const authReducer = (state = userData, action) => {
  switch (action.type) {
    case 'SET_SIGN_IN':
      return {
        ...state,
        isSignedIn: action.payload,
      };
    case 'SET_GOOGLE_ID':
      return {
        ...state,
        googleId: action.payload,
      };
    case 'SET_MAIL':
      return {
        ...state,
        mail: action.payload,
      };
  }
  return state;
};
const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SUCCESS_MESSAGE':
      return {
        ...state,
        successMessage: action.payload,
      };
    case 'SET_SELECTED_POST_DETAILS':
      return {
        ...state,
        selectedPostDetails: action.payload,
      };
    case 'SET_LOADING_EDIT_POST':
      return {
        ...state,
        onEditLoading: action.payload,
      };
    case 'SET_LOADING_DELETE_POST':
      return {
        ...state,
        onDeleteLoading: action.payload,
      };
    case 'SET_EDIT_POST_ID':
      return {
        ...state,
        selectedPostId: action.payload,
      };
    case 'SET_LOADING_DATA':
      return {
        ...state,
        loadingData: action.payload,
      };
    case 'SET_LOADING_ADD_POST':
      return {
        ...state,
        addPostLoading: action.payload,
      };
    case 'SET_POSTS':
      return {
        ...state,
        data: [...action.payload],
      };
    case 'SET_FORM':
      return {
        ...state,
        showForm: action.payload,
      };
  }
  return state;
};

export default combineReducers({
  dummyReducer: () => '',
  posts: postsReducer,
  authentication: authReducer,
});
