import PostService from '../service';

export const setPosts = () => async (dispatch) => {
  dispatch(loadingPosts(true));
  await new Promise((res) => setTimeout(res, 1000));
  const { data } = await PostService.listPosts();
  dispatch({
    type: 'SET_POSTS',
    payload: data,
  });

  dispatch(loadingPosts(false));
};
export const signIn = (signin) => {
  return {
    type: 'SET_SIGN_IN',
    payload: signin,
  };
};
export const googleId = (gid) => {
  return {
    type: 'SET_GOOGLE_ID',
    payload: gid,
  };
};
export const mail = (mail) => {
  return {
    type: 'SET_MAIL',
    payload: mail,
  };
};
export const loadingPosts = (payload) => {
  return {
    type: 'SET_LOADING_DATA',
    payload: payload,
  };
};
export const addPostLoading = (payload) => {
  return {
    type: 'SET_LOADING_ADD_POST',
    payload: payload,
  };
};
export const showForm = (payload) => {
  return {
    type: 'SET_FORM',
    payload,
  };
};

export const cancelForm = () => (dispatch) => {
  dispatch(showForm(false));
  dispatch({
    type: 'SET_EDIT_POST_ID',
    payload: null,
  });
  dispatch({
    type: 'SET_SELECTED_POST_DETAILS',
    payload: null,
  });
};

export const addPost = (payload) => async (dispatch) => {
  dispatch(addPostLoading(true));
  await new Promise((res) => setTimeout(res, 1000));
  const { data } = await PostService.createPost(payload);

  dispatch(addPostLoading(false));
  dispatch(showForm(false));
  dispatch(setSuccessMessage('ADD SUCCESSFULLY'));
  dispatch(setPosts());
};

export const editPost = (id, payload) => async (dispatch) => {
  dispatch(addPostLoading(true));
  await new Promise((res) => setTimeout(res, 1000));
  const { data } = await PostService.updatePost(id, payload);

  dispatch(addPostLoading(false));
  dispatch(cancelForm());
  dispatch(setSuccessMessage('SUCCESSFULLY EDITED'));
  dispatch(setPosts());
};

export const setSuccessMessage = (payload) => ({
  type: 'SET_SUCCESS_MESSAGE',
  payload,
});
export const resetSuccessMessage = () => ({
  type: 'SET_SUCCESS_MESSAGE',
  payload: null,
});
export const deletePost = (id) => async (dispatch) => {
  dispatch({
    type: 'SET_LOADING_DELETE_POST',
    payload: true,
  });
  await new Promise((res) => setTimeout(res, 1000));
  const { data } = await PostService.deletePost(id);
  dispatch({
    type: 'SET_LOADING_DELETE_POST',
    payload: false,
  });
  dispatch(cancelForm());
  dispatch(setSuccessMessage('DELETED SUCCESSFULLY'));
  dispatch(setPosts());
};

export const getPost = (id) => async (dispatch) => {
  dispatch({
    type: 'SET_LOADING_EDIT_POST',
    payload: true,
  });
  dispatch({
    type: 'SET_EDIT_POST_ID',
    payload: id,
  });
  await new Promise((res) => setTimeout(res, 1000));
  const { data } = await PostService.getPost(id);
  dispatch({
    type: 'SET_SELECTED_POST_DETAILS',
    payload: data,
  });
  dispatch({
    type: 'SET_LOADING_EDIT_POST',
    payload: false,
  });

  // dispatch(addPostLoading(false));
  dispatch(showForm(true));
  dispatch(setPosts());
};
