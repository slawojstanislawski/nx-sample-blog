import {PostsState, initialState, reducer} from './posts.reducer';
import {LoadPostsSuccess} from './posts.actions';
import {IPost} from '../shared/types';

describe('Posts Reducer', () => {
  const getPostsId = it => it['id'];
  let createPosts;
  beforeEach(() => {
    createPosts = (_id: string, title = '', content = ''): IPost => ({
      _id,
      title: title || `title-${_id}`,
      content: content || `content-${_id}`
    });
  });
  describe('valid Posts actions ', () => {
    it('should return set the list of known Posts', () => {
      const postss = [createPosts('PRODUCT-AAA'), createPosts('PRODUCT-zzz')];
      const action = new LoadPostsSuccess(postss);
      const result: PostsState = reducer(initialState, action);
      const selId: string = getPostsId(result.list[1]);

      expect(result.loading).toBe(false);
      expect(result.list.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
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
