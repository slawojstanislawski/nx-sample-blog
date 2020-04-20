import {createAction, props} from '@ngrx/store';

import {IPost} from '@blog/shared/posts/data-access';
import {IApiError} from '@blog/shared/data-access';
import {Update} from '@ngrx/entity/src/models';

export const setSelected = createAction(
  '[Posts] Set Selected',
  props<{id: string}>()
);

export const createPost = createAction(
  '[Posts] Create Post',
  props<{post: IPost}>()
);

export const createPostSuccess = createAction(
  '[Posts] Create Post Success',
  props<{post: IPost}>()
);

export const createPostFailure = createAction(
  '[Posts] Create Post Failure',
  props<{error: IApiError}>()
);

export const loadPosts = createAction('[Posts] Load Posts');

export const loadPostsSuccess = createAction(
  '[Posts] Load Posts Success',
  props<{posts: IPost[]}>()
);

export const loadPostsFailure = createAction(
  '[Posts] Load Posts Failure',
  props<{error: IApiError}>()
);

export const loadPost = createAction(
  '[Posts] Load Post',
  props<{id: string}>()
);

export const loadPostSuccess = createAction(
  '[Posts] Load Post Success',
  props<{post: IPost}>()
);

export const loadPostFailure = createAction(
  '[Posts] Load Post Failure',
  props<{error: IApiError}>()
);

export const updatePost = createAction(
  '[Posts] Update Post',
  props<{update: Update<IPost>}>()
);

export const updatePostSuccess = createAction(
  '[Posts] Update Post Success',
  props<{post: IPost}>()
);

export const updatePostFailure = createAction(
  '[Posts] Update Post Failure',
  props<{error: IApiError}>()
);

export const deletePost = createAction(
  '[Posts] Delete Post',
  props<{id: string}>()
);

export const deletePostSuccess = createAction(
  '[Posts] Delete Post Success',
  props<{id: string}>() // TODO: verify if it's the case
);

export const deletePostFailure = createAction(
  '[Posts] Delete Post Failure',
  props<{error: IApiError}>()
);
