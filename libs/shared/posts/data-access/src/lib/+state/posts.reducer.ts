import {PostsAction, PostsActionTypes} from './posts.actions';
import {IApiError} from '@blog/shared/data-access';
import {IPost} from '../shared/types';

export const POSTS_FEATURE_KEY = 'posts';

export interface PostsState {
  list: IPost[];
  selectedId?: string | number;
  loading: boolean;
  errorList?: IApiError;
  errorSingleItem?: IApiError;
  updating: boolean;
  deleting: boolean;
}

export interface PostsPartialState {
  readonly [POSTS_FEATURE_KEY]: PostsState;
}

export const initialState: PostsState = {
  list: [],
  loading: false,
  updating: false,
  deleting: false
};

export function reducer(
  state: PostsState = initialState,
  action: PostsAction
): PostsState {
  switch (action.type) {
    case PostsActionTypes.SetSelected: {
      state = {
        ...state,
        selectedId: action.payload
      };
      break;
    }
    case PostsActionTypes.LoadPost:
    case PostsActionTypes.LoadPosts: {
      state = {
        ...state,
        list: [],
        loading: true,
        errorList: undefined
      };
      break;
    }
    case PostsActionTypes.LoadPostSuccess: {
      state = {
        ...state,
        list: [action.payload],
        loading: false
      };
      break;
    }
    case PostsActionTypes.LoadPostsSuccess: {
      state = {
        ...state,
        list: action.payload,
        loading: false
      };
      break;
    }
    case PostsActionTypes.LoadPostError:
    case PostsActionTypes.LoadPostsError: {
      state = {
        ...state,
        list: [],
        loading: false,
        errorList: action.payload
      };
      break;
    }
    case PostsActionTypes.UpdatePost:
    case PostsActionTypes.CreatePost: {
      state = {
        ...state,
        updating: true,
        errorList: undefined
      };
      break;
    }
    case PostsActionTypes.DeletePost: {
      state = {
        ...state,
        deleting: true,
        errorSingleItem: undefined
      };
      break;
    }
    case PostsActionTypes.DeletePostError: {
      state = {
        ...state,
        deleting: false,
        errorSingleItem: action.payload
      };
      break;
    }
    case PostsActionTypes.CreatePostSuccess: {
      state = {
        ...state,
        updating: false
      };
      break;
    }
    case PostsActionTypes.UpdatePostError:
    case PostsActionTypes.CreatePostError: {
      state = {
        ...state,
        updating: false,
        errorList: action.payload
      };
      break;
    }
    case PostsActionTypes.DeletePostSuccess: {
      let posts = [...state.list];
      posts = posts.filter(p => p.id !== action.payload);
      state = {
        ...state,
        deleting: false,
        list: posts
      };
      break;
    }
    case PostsActionTypes.UpdatePostSuccess: {
      const posts = [...state.list];
      let post = posts.find(p => p.id === action.payload.id);
      if (post) {
        post = {...action.payload};
        state = {
          ...state,
          updating: false,
          list: posts
        };
      }
      break;
    }
  }
  return state;
}
