import {NgModule} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {readFirst} from '@nrwl/angular/testing';

import {EffectsModule} from '@ngrx/effects';
import {StoreModule, Store} from '@ngrx/store';

import {NxModule} from '@nrwl/angular';

import {PostsEntity} from './posts.models';
import {PostsEffects} from './posts.effects';
import {PostsFacade} from './posts.facade';

import * as PostsSelectors from './posts.selectors';
import * as PostsActions from './posts.actions';
import {POSTS_FEATURE_KEY, State, initialState, reducer} from './posts.reducer';

interface TestSchema {
  posts: State;
}

describe('PostsFacade', () => {
  let facade: PostsFacade;
  let store: Store<TestSchema>;
  const createPostsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as PostsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(POSTS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([PostsEffects])
        ],
        providers: [PostsFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({imports: [RootModule]});

      store = TestBed.get(Store);
      facade = TestBed.get(PostsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allPosts$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(PostsActions.loadPosts());

        list = await readFirst(facade.allPosts$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadPostsSuccess` to manually update list
     */
    it('allPosts$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allPosts$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          PostsActions.loadPostsSuccess({
            posts: [createPostsEntity('AAA'), createPostsEntity('BBB')]
          })
        );

        list = await readFirst(facade.allPosts$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
