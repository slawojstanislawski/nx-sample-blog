import {createFeatureSelector, createSelector} from '@ngrx/store';
import {
  POSTS_FEATURE_KEY,
  State,
  PostsPartialState,
  postsAdapter
} from './posts.reducer';
import {IPost} from '@blog/shared/posts/data-access';

export const getPostsState = createFeatureSelector<PostsPartialState, State>(
  POSTS_FEATURE_KEY
);

const {selectAll, selectEntities} = postsAdapter.getSelectors();

export const getLoading = createSelector(
  getPostsState,
  (state: State) => state.loading
);

export const getUpdating = createSelector(
  getPostsState,
  (state: State) => state.updating
);

export const getDeleting = createSelector(
  getPostsState,
  (state: State) => state.deleting
);

export const getErrorList = createSelector(
  getPostsState,
  (state: State) => state.errorList
);

export const getErrorSingleItem = createSelector(
  getPostsState,
  (state: State) => state.errorSingleItem
);

export const getAllPosts = createSelector(getPostsState, (state: State) =>
  selectAll(state)
);

export const getPostsEntities = createSelector(getPostsState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getPostsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector<PostsPartialState, any, any, IPost>(
  getPostsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
