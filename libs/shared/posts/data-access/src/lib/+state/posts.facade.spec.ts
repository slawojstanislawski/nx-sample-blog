import {NgModule} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {readFirst} from '@nrwl/angular/testing';

import {EffectsModule} from '@ngrx/effects';
import {StoreModule, Store} from '@ngrx/store';

import {NxModule} from '@nrwl/angular';

import {PostsEffects} from './posts.effects';
import {PostsFacade} from './posts.facade';

import {PostsState, initialState, reducer} from './posts.reducer';
import {LoadPostsSuccess} from './posts.actions';
import {IPost} from '../shared/types';

interface TestSchema {
  posts: PostsState;
}

describe('PostsFacade', () => {
  let facade: PostsFacade;
  let store: Store<TestSchema>;
  let createPosts;
  beforeEach(() => {
    createPosts = (_id: string, title = '', content = ''): IPost => ({
      _id,
      title: title || `title-${_id}`,
      content: content || `content-${_id}`
    });
  });
  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature('posts', reducer, {initialState}),
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
        let isLoaded = await readFirst(facade.loading$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.loadAll();

        list = await readFirst(facade.allPosts$);
        isLoaded = await readFirst(facade.loading$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `PostsLoaded` to manually submit list for state management
     */
    it('allPosts$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allPosts$);
        let isLoaded = await readFirst(facade.loading$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          new LoadPostsSuccess([createPosts('AAA'), createPosts('BBB')])
        );

        list = await readFirst(facade.allPosts$);
        isLoaded = await readFirst(facade.loading$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
