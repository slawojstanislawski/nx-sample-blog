import {createFeatureSelector, createSelector} from '@ngrx/store';
import {POSTS_FEATURE_KEY, PostsState} from './posts.reducer';

// Lookup the 'Posts' feature state managed by NgRx
const getPostsState = createFeatureSelector<PostsState>(POSTS_FEATURE_KEY);

const getLoading = createSelector(
  getPostsState,
  (state: PostsState) => state.loading
);

const getUpdating = createSelector(
  getPostsState,
  (state: PostsState) => state.updating
);

const getDeleting = createSelector(
  getPostsState,
  (state: PostsState) => state.deleting
);

const getErrorList = createSelector(
  getPostsState,
  (state: PostsState) => state.errorList
);

const getErrorSingleItem = createSelector(
  getPostsState,
  (state: PostsState) => state.errorSingleItem
);

const getAllPosts = createSelector(
  getPostsState,
  getLoading,
  (state: PostsState, isLoading) => {
    return isLoading ? [] : state.list;
  }
);

const getSelectedId = createSelector(
  getPostsState,
  (state: PostsState) => state.selectedId
);

const getSelectedPost = createSelector(
  getAllPosts,
  getSelectedId,
  (posts, id) => {
    const result = posts.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const postsQuery = {
  getLoading,
  getUpdating,
  getDeleting,
  getErrorList,
  getErrorSingleItem,
  getAllPosts,
  getSelectedPost
};
