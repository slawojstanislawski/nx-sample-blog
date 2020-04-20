import {PostsEntity} from './posts.models';
import * as PostsActions from './posts.actions';
import {State, initialState, reducer} from './posts.reducer';

describe('Posts Reducer', () => {
  const createPostsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as PostsEntity);

  beforeEach(() => {});

  describe('valid Posts actions', () => {
    it('loadPostsSuccess should return set the list of known Posts', () => {
      const posts = [
        createPostsEntity('PRODUCT-AAA'),
        createPostsEntity('PRODUCT-zzz')
      ];
      const action = PostsActions.loadPostsSuccess({posts});

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
