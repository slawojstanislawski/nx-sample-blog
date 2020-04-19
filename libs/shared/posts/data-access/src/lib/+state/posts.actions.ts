import {IPost} from '../shared/types';
import {Action} from '@ngrx/store';

import {IApiError} from '@blog/shared/data-access';

export enum PostsActionTypes {
  SetSelected = '[Posts] Set Selected',
  LoadPosts = '[Posts] Load Posts',
  LoadPostsSuccess = '[Posts] Load Posts Success',
  LoadPostsError = '[Posts] Load Posts Error',
  LoadPost = '[Posts] Load Post',
  LoadPostSuccess = '[Posts] Load Post Success',
  LoadPostError = '[Posts] Load Post Error',
  CreatePost = '[Posts] Create Post',
  CreatePostSuccess = '[Posts] Create Post Success',
  CreatePostError = '[Posts] Create Post Failure',
  DeletePost = '[Posts] Delete Post',
  DeletePostSuccess = '[Posts] Delete Post Success',
  DeletePostError = '[Posts] Delete Post Error',
  UpdatePost = '[Posts] Update Post',
  UpdatePostSuccess = '[Posts] Update Success',
  UpdatePostError = '[Posts] Update Error'
}

export class SetSelected implements Action {
  readonly type = PostsActionTypes.SetSelected;
  constructor(public payload: string) {}
}

export class LoadPost implements Action {
  readonly type = PostsActionTypes.LoadPost;
  constructor(public payload: string) {}
}

export class LoadPostSuccess implements Action {
  readonly type = PostsActionTypes.LoadPostSuccess;
  constructor(public payload: IPost) {}
}

export class LoadPostError implements Action {
  readonly type = PostsActionTypes.LoadPostError;
  constructor(public payload: IApiError) {}
}

export class LoadPosts implements Action {
  readonly type = PostsActionTypes.LoadPosts;
}

export class LoadPostsError implements Action {
  readonly type = PostsActionTypes.LoadPostsError;
  constructor(public payload: IApiError) {}
}

export class LoadPostsSuccess implements Action {
  readonly type = PostsActionTypes.LoadPostsSuccess;
  constructor(public payload: IPost[]) {}
}

export class DeletePost implements Action {
  readonly type = PostsActionTypes.DeletePost;

  constructor(public payload: string) {}
}

export class DeletePostSuccess implements Action {
  readonly type = PostsActionTypes.DeletePostSuccess;

  constructor(public payload: string) {}
}

export class DeletePostError implements Action {
  readonly type = PostsActionTypes.DeletePostError;

  constructor(public payload: IApiError) {}
}

export class UpdatePost implements Action {
  readonly type = PostsActionTypes.UpdatePost;

  constructor(public payload: {id: string; updates: Partial<IPost>}) {}
}

export class UpdatePostSuccess implements Action {
  readonly type = PostsActionTypes.UpdatePostSuccess;

  constructor(public payload: IPost) {}
}

export class UpdatePostError implements Action {
  readonly type = PostsActionTypes.UpdatePostError;

  constructor(public payload: IApiError) {}
}

export class CreatePost implements Action {
  readonly type = PostsActionTypes.CreatePost;

  constructor(public payload: IPost) {}
}

export class CreatePostSuccess implements Action {
  readonly type = PostsActionTypes.CreatePostSuccess;

  constructor(public payload: IPost) {}
}

export class CreatePostError implements Action {
  readonly type = PostsActionTypes.CreatePostError;

  constructor(public payload: IApiError) {}
}

export type PostsAction =
  | SetSelected
  | LoadPosts
  | LoadPostsSuccess
  | LoadPostsError
  | LoadPost
  | LoadPostSuccess
  | LoadPostError
  | CreatePost
  | CreatePostSuccess
  | CreatePostError
  | DeletePost
  | DeletePostSuccess
  | DeletePostError
  | UpdatePost
  | UpdatePostSuccess
  | UpdatePostError;

export const fromPostsActions = {
  SetSelected,
  LoadPosts,
  LoadPostsSuccess,
  LoadPostsError,
  LoadPost,
  LoadPostSuccess,
  LoadPostError,
  CreatePost,
  CreatePostSuccess,
  CreatePostError,
  DeletePost,
  DeletePostSuccess,
  DeletePostError,
  UpdatePost,
  UpdatePostSuccess,
  UpdatePostError
};
