import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {createReducer, on, Action} from '@ngrx/store';

import {IPost} from '@blog/shared/posts/data-access';
import {IApiError} from '@blog/shared/data-access';
import * as PostsActions from './posts.actions';

export const POSTS_FEATURE_KEY = 'posts';

export interface State extends EntityState<IPost> {
  selectedId?: string | number;
  loading: boolean;
  errorList: IApiError | null;
  errorSingleItem: IApiError | null;
  updating: boolean;
  deleting: boolean;
}

export interface PostsPartialState {
  readonly [POSTS_FEATURE_KEY]: State;
}

export const postsAdapter: EntityAdapter<IPost> = createEntityAdapter<IPost>();

export const initialState: State = postsAdapter.getInitialState({
  loading: false,
  updating: false,
  deleting: false,
  errorList: null,
  errorSingleItem: null
});

const postsReducer = createReducer(
  initialState,
  on(PostsActions.setSelected, (state, {id}) => ({...state, selectedId: id})),
  on(PostsActions.loadPost, PostsActions.loadPosts, state => ({
    ...state,
    loading: true,
    errorList: null
  })),
  on(PostsActions.loadPostSuccess, (state, {post}) =>
    postsAdapter.addOne(post, {...state, loading: false})
  ),
  on(PostsActions.loadPostsSuccess, (state, {posts}) =>
    postsAdapter.setAll(posts, {...state, loading: false})
  ),
  on(PostsActions.loadPostFailure, (state, {error}) => ({
    ...state,
    errorSingleItem: null,
    loading: false
  })),
  on(PostsActions.loadPostsFailure, (state, {error}) => ({
    ...state,
    errorList: error,
    loading: false
  })),
  on(PostsActions.updatePost, PostsActions.createPost, state => ({
    ...state,
    updating: true,
    errorList: null,
    errorSingleItem: null
  })),
  on(PostsActions.updatePostSuccess, (state, {post}) =>
    postsAdapter.updateOne(
      {id: post.id, changes: post},
      {...state, updating: false}
    )
  ),
  on(
    PostsActions.updatePostFailure,
    PostsActions.createPostFailure,
    (state, {error}) => ({
      ...state,
      updating: false,
      errorSingleItem: error
    })
  ),
  on(PostsActions.createPostSuccess, state => ({
    ...state,
    updating: false
  })),
  on(PostsActions.deletePost, state => ({
    ...state,
    deleting: true,
    errorSingleItem: null
  })),
  on(PostsActions.deletePostSuccess, (state, {id}) =>
    postsAdapter.removeOne(id, {...state, deleting: false})
  ),
  on(PostsActions.deletePostFailure, (state, {error}) => ({
    ...state,
    deleting: false,
    errorSingleItem: error
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return postsReducer(state, action);
}
