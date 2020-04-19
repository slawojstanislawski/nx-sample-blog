import {postsQuery} from './posts.selectors';
import {IPost} from '../shared/types';

describe('Posts Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getPostsId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createPosts = (_id: string, title = '', content = ''): IPost => ({
      _id,
      title: title || `title-${_id}`,
      content: content || `content-${_id}`
    });
    storeState = {
      posts: {
        list: [
          createPosts('PRODUCT-AAA'),
          createPosts('PRODUCT-BBB'),
          createPosts('PRODUCT-CCC')
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('Posts Selectors', () => {
    it('getAllPosts() should return the list of Posts', () => {
      const results = postsQuery.getAllPosts(storeState);
      const selId = getPostsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedPosts() should return the selected Entity', () => {
      const result = postsQuery.getSelectedPosts(storeState);
      const selId = getPostsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = postsQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = postsQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
